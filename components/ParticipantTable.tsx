"use client";

import React, { useEffect, useState } from "react";
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

type Candidate = {
  candidate_id: string;
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: string;
  department: string;
  degree: string;
  cvUrl: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
  prefCompany1?: string | null;
  prefCompany2?: string | null;
  prefCompany3?: string | null;
  prefCompany4?: string | null;
};

type Participant = {
  name: string;
  degree: string;
  allocatedTime: string;
  attended: boolean;
  candidateId: string;
};

// Table columns definition
const columns: ColumnDef<Participant, any>[] = [
  {
    header: "Name",
    accessorKey: "name",
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
    cell: ({ row, table }) => (
      <Checkbox
        checked={row.original.attended}
        onChange={async () => {
          const newParticipants = table.options.data.map(
            (participant, index) => {
              if (index === row.index) {
                return { ...participant, attended: !participant.attended };
              }
              return participant;
            }
          );

          table.setOptions((prevOptions) => ({
            ...prevOptions,
            data: newParticipants,
          }));

          try {
            await updateParticipantAttendance(newParticipants[row.index]);
          } catch (error) {
            console.error("Failed to update participant attendance:", error);
          }
        }}
      />
    ),
  },
];

// Mock function to update participant attendance in the database
async function updateParticipantAttendance(participant: Participant) {
  const response = await fetch("/api/v1/candidate/updateAttendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      candidateId: participant.candidateId,
      attended: participant.attended,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update participant attendance");
  }
}

type ParticipantTableProps = {
  candidateDetails: Candidate[];
};

const ParticipantTable: React.FC<ParticipantTableProps> = ({
  candidateDetails,
}) => {
  const [data, setData] = useState<Participant[]>([]);

  useEffect(() => {
    async function fetchAllocations() {
      const participants = await Promise.all(
        candidateDetails.map(async (candidate) => {
          let allocatedTime = "Not Specified";
          let attended = false;

          try {
            const res = await fetch(
              `/api/v1/candidate/getAllocations?candidateId=${candidate.candidate_id}`
            );
            if (res.ok) {
              const allocations = await res.json();
              if (allocations.length > 0) {
                allocatedTime = `${allocations[0].allocation_date} ${allocations[0].allocation_timeSlot}`;
                attended = allocations[0].attendance;
              }
            }
          } catch (error) {
            console.error("Error fetching allocation data:", error);
          }

          return {
            name: `${candidate.firstName} ${candidate.lastName}`,
            degree: candidate.degree,
            allocatedTime,
            attended,
            candidateId: candidate.candidate_id,
          };
        })
      );

      setData(participants);
    }

    fetchAllocations();
  }, [candidateDetails]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
