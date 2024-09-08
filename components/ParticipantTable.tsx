"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import Next.js Link
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

// Define the type for the candidate data
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

// Define the type for the participant data
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

async function fetchAllocations(
  candidateDetails: Candidate[]
): Promise<Participant[]> {
  const participants = await Promise.all(
    candidateDetails.map(async (candidate) => {
      let allocatedTime = "Not Specified";
      let attended = false;
      let allocationId = "";

      try {
        const res = await fetch(
          `/api/v1/candidate/getAllocations?candidateId=${candidate.candidate_id}`
        );
        if (res.ok) {
          const allocations = await res.json();
          console.log(allocations);
          if (allocations.length > 0) {
            allocatedTime = `${allocations[0].allocation_timeSlot}`;
            attended = allocations[0].attendance;
            allocationId = allocations[0].allocation_id;
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
        allocationId,
      };
    })
  );
  console.log(participants);
  // Sort participants by allocatedTime
  participants.sort((a, b) => {
    if (
      a.allocatedTime !== "Not Specified" &&
      b.allocatedTime !== "Not Specified"
    ) {
      return (
        new Date(a.allocatedTime).getTime() -
        new Date(b.allocatedTime).getTime()
      );
    }
    if (a.allocatedTime === "Not Specified") return 1;
    if (b.allocatedTime === "Not Specified") return -1;
    return 0;
  });

  return participants;
}

type ParticipantTableProps = {
  candidateDetails: Candidate[];
  panelistId: string; // Add panelistId as a prop
};

const ParticipantTable: React.FC<ParticipantTableProps> = ({
  candidateDetails,
  panelistId, // Use panelistId from props
}) => {
  const [data, setData] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [attendanceState, setAttendanceState] = useState<{
    [key: string]: boolean;
  }>({});
  const [updatingState, setUpdatingState] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    async function initializeAllocations() {
      setLoading(true);
      try {
        const participants = await fetchAllocations(candidateDetails);
        setData(participants);

        // Initialize attendanceState and updatingState
        const initialAttendanceState: { [key: string]: boolean } = {};
        const initialUpdatingState: { [key: string]: boolean } = {};
        participants.forEach((participant) => {
          initialAttendanceState[participant.candidateId] =
            participant.attended;
          initialUpdatingState[participant.candidateId] = false;
        });
        setAttendanceState(initialAttendanceState);
        setUpdatingState(initialUpdatingState);
      } finally {
        setLoading(false);
      }
    }

    initializeAllocations();
  }, [candidateDetails]);

  const handleCheckboxChange = async (
    candidateId: string,
    attended: boolean
  ) => {
    const updatedParticipant = data.find(
      (participant) => participant.candidateId === candidateId
    );
    if (!updatedParticipant) return;

    // Set updating state to true for the current row
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
      // Set updating state back to false after the update is complete
      setUpdatingState((prev) => ({
        ...prev,
        [candidateId]: false,
      }));
    }
  };

  // Table columns definition
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
