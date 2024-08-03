"use client";

import React, { useState } from "react";
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

const initialParticipants = [
  {
    name: "John Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "Jane Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "John Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "Jane Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "John Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "Jane Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "John Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "Jane Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "John Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "Jane Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "John Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "Jane Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "John Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
  {
    name: "Jane Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  },
];

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
        onChange={() => {
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
          // this is for database update logic
          // updateParticipantInDatabase(newParticipants[row.index]);
        }}
      />
    ),
  },
];

const ParticipantTable = () => {
  const [data, setData] = useState(initialParticipants);

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
