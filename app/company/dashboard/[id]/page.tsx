import React from "react";
import StudentNavbar from "@/components/StudentNavbar";
import ParticipantTable from "@/components/ParticipantTable";
import {getAllocationDetails} from "@/service/getAllocationDetails"; 

type Paramms = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Paramms) => {
  const panelistId = params.id; 
  console.log(panelistId);

  const participants = await getAllocationDetails(panelistId);

  console.log(participants);
  
  
  

  return (
    <div>
      <div className="ml-20 mr-20">
        <StudentNavbar />
      </div>

      <div className="container mx-auto p-4">
        <ParticipantTable
          participants={participants}
          panelistId={panelistId}
        />
      </div>
    </div>
  );
};

export default Page;
