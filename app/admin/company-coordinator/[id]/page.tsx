import { getCandidates } from "@/service/getCandidates";
import { Allocation, Candidate, Company, Feedback, Panelist } from "@/Type";
import AllInterviewers from "./components/allInterviewers";
import { getFeedback } from "@/service/getFeedback";
import { getCompany } from "@/service/getCompany";
import { InterviewAllocation } from "@/service/InterviewAllocation";
import { getAllocation } from "@/service/getInterviewAllocation";
import { getUserById } from "@/service/getUserById";
import { notFound } from "next/navigation";
import { all } from "axios";
import { getAllPanelistForOneCompany } from "@/service/getAllPanelistForOneCompany";

type Paramms = {
  params: {
    id: string;
  };
};

const CompanyCoordinator = async ({ params }: Paramms) => {
  // get company coordinator id from params
  const companyCoordinatorId = params.id;
  console.log(companyCoordinatorId);

  // get company coordinator details
  const user = await getUserById({ userId: companyCoordinatorId });

  // if that user is not a company coordinator, return 404
  if (user == null || user.role !== "companyCoordinator") {
    notFound();
  }

  // get company name of the company coordinator
  const compnanyCoordinatorCompanyName =
    user.company_cordnator.company.company_name;

  const compnanyCoordinatorCompanyId = user.company_cordnator.company_id;


  console.log(user);
  console.log(compnanyCoordinatorCompanyName);
  console.log(compnanyCoordinatorCompanyId);

  /////////////////////////// above code done by ruchith ///////////////////////////

  const response = await getCandidates();
  const companyResponce = await getCompany();
  const feedbackResponse = await getFeedback();
  const allAllocation = await getAllocation();
  const allPanelist = await getAllPanelistForOneCompany(compnanyCoordinatorCompanyId);
  console.log(allAllocation.data[0].company_id);
  console.log(feedbackResponse);
  console.log(response);

  const filterAllocation = allAllocation.data.filter(
    (allocation: Allocation) =>
      allocation.company_id === compnanyCoordinatorCompanyId
  );

  // const filterResponse = response.data.filter(
  //   (allocation: Allocation) =>
  //     allocation.company_id === compnanyCoordinatorCompanyId
  // );

  let initialCandidates: Candidate[] = [];
  let feedback: Feedback[] = [];
  let company: Company[] = [];
  let allocation: Allocation[] = filterAllocation.data || [];
  let allPanelists: Panelist[] = [];
  console.log(allocation);
  console.log(filterAllocation);
  console.log(
    filterAllocation.forEach(
      (allocation: Allocation) => allocation.candidate_id
    )
  );
  if (response && response.data) {
    initialCandidates = response.data.filter((candidate: Candidate) =>
      filterAllocation.some(
        (allocation: Allocation) =>
          allocation.candidate_id === candidate.candidate_id
      )
    );
  } else {
    throw new Error("Failed to fetch candidates");
  }

  if (feedbackResponse && feedbackResponse.data) {
    feedback = feedbackResponse.data;
  } else {
    new Error("Failed to fetch feedback");
  }

  if (companyResponce && companyResponce.data) {
    company = companyResponce.data;
  } else {
    new Error("Failed to fetch company");
  }
  if (allAllocation && allAllocation.data) {
    allocation = allAllocation.data;
  } else {
    new Error("Failed to fetch Allocations");
  }
  if (allPanelist && allPanelist.data) {
    allPanelists = allPanelist.data;
  } else {
    new Error("Failed to fetch Panelist");
  }
  console.log(feedback);
  console.log(filterAllocation);
  return (
    <AllInterviewers
    compnanyCoordinatorCompanyName={compnanyCoordinatorCompanyName}
      initialCandidates={initialCandidates}
      feedbacks={feedback}
      company={company}
      allocation={filterAllocation}
      allPanelists={allPanelists}
    />
  );
};

export default CompanyCoordinator;
