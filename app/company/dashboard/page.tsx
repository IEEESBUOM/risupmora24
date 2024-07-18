"use client"
import StudentNavbar from "@/components/StudentNavbar";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialParticipants = [
  {
    name: "John Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: true,
  },
  {
    name: "Jane Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: true,
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
    attended: true,
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
    attended: true,
  },
  {
    name: "John Doe",
    degree: "BSc. Computer Science",
    allocatedTime: "10:00 AM - 11:00 AM",
    attended: false,
  }
];

const Page = () => {
  const [participants, setParticipants] = useState(initialParticipants);

  const handleCheckboxChange = (index: number) => {
    const updatedParticipants = participants.map((participant, i) =>
      i === index
        ? { ...participant, attended: !participant.attended }
        : participant
    );
    setParticipants(updatedParticipants);
  };

  return (
    <div>
      <StudentNavbar />
      <div className="container mx-auto p-4">
        <Table className="w-full">
          <TableHeader className="bg-stv-dark-blue text-stv-yellow">
            <TableRow>
              <TableHead className="w-[100px] ">Name</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Allocated Time</TableHead>
              <TableHead className="text-center">Attendant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {participant.name}
                </TableCell>
                <TableCell>{participant.degree}</TableCell>
                <TableCell>{participant.allocatedTime}</TableCell>
                <TableCell className="text-center">
                  <label htmlFor={`checkbox-${index}`}>
                    <Checkbox
                      id={`checkbox-${index}`}
                      checked={participant.attended}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
