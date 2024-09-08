import React from "react";
import StudentNavbar from "@/components/StudentNavbar";
import ParticipantTable from "@/components/ParticipantTable";
import { fetchAllocations } from "@/service/getAllocations";
import { Console } from "console";

type Paramms = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Paramms) => {
  
  const panalistId = params.id;

  const participants = await fetchAllocations(panalistId);

  
  console.log(participants);
  

  return (
    <div>
      <div className="ml-20 mr-20">
        <StudentNavbar />
      </div>

      <div className="container mx-auto p-4">
        <ParticipantTable
          participantDetails={participants}
        />
      </div>
    </div>
  );
};

export default Page;
