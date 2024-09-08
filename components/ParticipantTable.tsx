"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import PageLoader from "./PageLoader";

type Participant = {
  name: string;
  degree: string;
  allocatedTime: string;
  attended: boolean;
  candidateId: string;
  allocationId: string;
};

async function updateParticipantAttendance(participant: Participant) {
  const response = await fetch("/api/v1/candidate/updateAttendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      allocationId: participant.allocationId,
      attended: participant.attended,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update participant attendance");
  }
}

type ParticipantTableProps = {
  participants: Participant[];
  panelistId: string;
};

const ParticipantTable: React.FC<ParticipantTableProps> = ({
  participants,
  panelistId,
}) => {
  const [data, setData] = useState<Participant[]>(participants);
  const [loading, setLoading] = useState<boolean>(false);
  const [attendanceState, setAttendanceState] = useState<{
    [key: string]: boolean;
  }>({});
  const [updatingState, setUpdatingState] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const initialAttendanceState: { [key: string]: boolean } = {};
    const initialUpdatingState: { [key: string]: boolean } = {};
    participants.forEach((participant) => {
      initialAttendanceState[participant.candidateId] = participant.attended;
      initialUpdatingState[participant.candidateId] = false;
    });
    setAttendanceState(initialAttendanceState);
    setUpdatingState(initialUpdatingState);
  }, [participants]);

  const handleCheckboxChange = async (
    candidateId: string,
    attended: boolean
  ) => {
    const updatedParticipant = data.find(
      (participant) => participant.candidateId === candidateId
    );
    if (!updatedParticipant) return;

    setUpdatingState((prev) => ({
      ...prev,
      [candidateId]: true,
    }));

    try {
      await updateParticipantAttendance({
        ...updatedParticipant,
        attended,
      });

      setAttendanceState((prev) => ({
        ...prev,
        [candidateId]: attended,
      }));

      setData((prevData) =>
        prevData.map((participant) =>
          participant.candidateId === candidateId
            ? { ...participant, attended }
            : participant
        )
      );
    } catch (error) {
      console.error("Failed to update participant attendance:", error);
    } finally {
      setUpdatingState((prev) => ({
        ...prev,
        [candidateId]: false,
      }));
    }
  };

  const columns: ColumnDef<Participant, any>[] = [
    {
      header: "Name",
      cell: ({ row }) => {
        const candidateId = row.original.candidateId;
        return (
          <Link
            href={`/candidate/candidate-dashboard/${row.original.candidateId}-${panelistId}`}
            className="text-blue-500 hover:underline"
          >
            {row.original.name}
          </Link>
        );
      },
    },
    {
      header: "Degree",
      accessorKey: "degree",
    },
    {
      header: "Allocated Time",
      accessorKey: "allocatedTime",
    },
    {
      header: "Attended",
      cell: ({ row }) => {
        const isChecked = attendanceState[row.original.candidateId] || false;
        const isUpdating = updatingState[row.original.candidateId] || false;
        return (
          <div className="flex items-center">
            <Checkbox
              checked={isChecked}
              onCheckedChange={() =>
                handleCheckboxChange(row.original.candidateId, !isChecked)
              }
              disabled={isUpdating}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        <Table className="w-full">
          <TableHeader className="bg-stv-dark-blue text-stv-yellow">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <div className="flex items-center justify-between py-2">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ParticipantTable;
