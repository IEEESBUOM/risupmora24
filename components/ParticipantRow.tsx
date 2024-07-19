import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const ParticipantRow = ({ participant, index, onCheckboxChange }: { participant: any, index: number, onCheckboxChange: any }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{participant.name}</TableCell>
      <TableCell>{participant.degree}</TableCell>
      <TableCell>{participant.allocatedTime}</TableCell>
      <TableCell className="text-center">
        <label htmlFor={`checkbox-${index}`}>
          <Checkbox
            id={`checkbox-${index}`}
            checked={participant.attended}
            onChange={() => onCheckboxChange(index)}
          />
        </label>
      </TableCell>
    </TableRow>
  );
};

export default ParticipantRow;
