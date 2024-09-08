import React from "react";
import StudentNavbar from "@/components/StudentNavbar";
import ParticipantTable from "@/components/ParticipantTable";
import { getCandidateDetails } from "@/service/getCandidateDetails";

type Paramms = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Paramms) => {
  // get panalist id from params
  const panalistId = params.id;

  const candidateDetails = await getCandidateDetails(panalistId);

  // get candidate details by panalist id from allocation table in database, it means tou have to create the api , that allocation table panalist_id eqaul to gettting panalistId, then you will get the candidate id, then you have to get the candidate details by candidate id

  // after that you have to pass the candidate details to the ParticipantTable component
  // happy coding

  return (
    <div>
      <div className="ml-20 mr-20">
        <StudentNavbar />
      </div>

      <div className="container mx-auto p-4">
        <ParticipantTable candidateDetails={candidateDetails} panelistId={panalistId} />
      </div>
    </div>
  );
};

export default Page;
