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
    cell: ({ row, table }) => {
      const [checked, setChecked] = useState(row.original.attended);
      const [updating, setUpdating] = useState(false);

      const handleCheckboxChange = async () => {
        setUpdating(true);
        const updatedParticipant = {
          ...row.original,
          attended: !checked,
        };

        try {
          // Update attendance in the database
          await updateParticipantAttendance(updatedParticipant);

          // Update local state immediately
          setChecked(updatedParticipant.attended);

          table.setOptions((prevOptions) => ({
            ...prevOptions,
            data: prevOptions.data.map((participant) =>
              participant.candidateId === updatedParticipant.candidateId
                ? { ...participant, attended: updatedParticipant.attended }
                : participant
            ),
          }));
        } catch (error) {
          console.error("Failed to update participant attendance:", error);
        } finally {
          setUpdating(false);
        }
      };

      return (
        <div className="flex items-center">
          <Checkbox
            checked={checked}
            onCheckedChange={handleCheckboxChange}
            disabled={updating}
          />
          {updating && (
            <span className="ml-2 text-sm text-gray-500">
              Updating attendance...
            </span>
          )}
        </div>
      );
    },
  },
];

// Function to update participant attendance in the database
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

// Function to fetch participant allocations
async function fetchAllocations(
  candidateDetails: Candidate[]
): Promise<Participant[]> {
  if (!candidateDetails || candidateDetails.length === 0) {
    return [];
  }

  const participants = await Promise.all(
    candidateDetails?.map(async (candidate) => {
      let allocatedTime = "Not Specified";
      let attended = false;
      let allocationId = "";

      try {
        const res = await fetch(
          `/api/v1/candidate/getAllocations?candidateId=${candidate.candidate_id}`
        );
        if (res.ok) {
          const allocations = await res.json();
          if (allocations.length > 0) {
            allocatedTime = `${allocations[0].allocation_date} ${allocations[0].allocation_timeSlot}`;
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

  return participants;
}

type ParticipantTableProps = {
  candidateDetails: Candidate[];
};

const ParticipantTable: React.FC<ParticipantTableProps> = ({
  candidateDetails,
}) => {
  const [data, setData] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function initializeAllocations() {
      setLoading(true);
      try {
        const participants = await fetchAllocations(candidateDetails);
        setData(participants);
      } finally {
        setLoading(false);
      }
    }

    initializeAllocations();
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
      {loading ? (
        <p>Loading...</p>
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
