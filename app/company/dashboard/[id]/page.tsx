import React from "react";
import StudentNavbar from "@/components/StudentNavbar";
import ParticipantTable from "@/components/ParticipantTable";

const Page = () => {
  return (
    <div>
      <div className="ml-20 mr-20">
        <StudentNavbar />
      </div>

      <div className="container mx-auto p-4">
        <ParticipantTable />
      </div>
    </div>
  );

};

export default Page;
