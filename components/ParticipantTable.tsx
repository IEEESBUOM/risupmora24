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

type Participant = {
  name: string;
  degree: string;
  allocatedTime: string;
  attended: boolean;
};

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

          // Update the database with the new attendance status
          try {
            await updateParticipantInDatabase(newParticipants[row.index]);
          } catch (error) {
            console.error("Failed to update participant attendance:", error);
          }
        }}
      />
    ),
  },
];

// Mock function to update participant attendance in the database
async function updateParticipantInDatabase(participant: Participant) {
  const response = await fetch("/api/updateParticipant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participant),
  });

  if (!response.ok) {
    throw new Error("Failed to update participant");
  }
}

const ParticipantTable = () => {
  const [data, setData] = useState<Participant[]>([]);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch("/api/getParticipants");
        const participants = await response.json();
        setData(participants);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, []);

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
