"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ParticipantRow from "@/components/ParticipantRow";

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
];

const ParticipantTable = () => {
  const [participants, setParticipants] = useState(initialParticipants);

  const handleCheckboxChange = (index: number) => {
    const updatedParticipants = participants.map((participant, i) =>
      i === index
        ? { ...participant, attended: !participant.attended }
        : participant
    );
    setParticipants(updatedParticipants);

    // database logic
    // this is dummy data so no database logic is implemented
    // updateParticipantInDatabase(updatedParticipants[index]);
  };

  return (
    <Table className="w-full">
      <TableHeader className="bg-stv-dark-blue text-stv-yellow">
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Degree</TableHead>
          <TableHead>Allocated Time</TableHead>
          <TableHead className="text-center">Attendant</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants.map((participant, index) => (
          <ParticipantRow
            key={index}
            participant={participant}
            index={index}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default ParticipantTable;
