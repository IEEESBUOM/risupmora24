import { getCandidates } from "@/service/getCandidates";
import { Allocation, Candidate, Company, Feedback } from "@/Type";
import AllInterviewers from "./components/allInterviewers";
import { getFeedback } from "@/service/getFeedback";
import { getCompany } from "@/service/getCompany";
import { InterviewAllocation } from "@/service/InterviewAllocation";
import { getAllocation } from "@/service/getInterviewAllocation";
import { getUserById } from "@/service/getUserById";
import { notFound } from "next/navigation";

type Paramms = {
  params: {
    id: string;
  };
};

const DepartmentCordinatorPage = async ({ params }: Paramms) => {
  // get department coordinator id from params
  const departmentCoordinatorId = params.id;
  console.log(departmentCoordinatorId);

  // get company coordinator details
  const user = await getUserById({ userId: departmentCoordinatorId });

  console.log(user);
  // if that user is not a company coordinator, return 404
  if (user == null || user.role !== "departmentCoordinator") {
    return notFound();
  }

  // get company name of the company coordinator
  const departmentCoordinatorDepartmentName =
    user.department_cordnator?.department;
  console.log(departmentCoordinatorDepartmentName);

  /////////////////////////// above code done by ruchith ///////////////////////////

  const response = await getCandidates();
  const companyResponce = await getCompany();
  const feedbackResponse = await getFeedback();
  const allAllocation = await getAllocation();
  console.log(feedbackResponse);
  console.log(response);

  let initialCandidates: Candidate[] = [];
  let feedback: Feedback[] = [];
  let company: Company[] = [];
  let allocation: Allocation[] = [];
  if (response && response.data) {
    initialCandidates = response.data;
  } else {
    new Error("Failed to fetch candidates");
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
  console.log(feedback);
  return (
    <AllInterviewers
      initialCandidates={initialCandidates}
      feedbacks={feedback}
      company={company}
      allocation={allocation}
    />
  );
};

export default DepartmentCordinatorPage;
