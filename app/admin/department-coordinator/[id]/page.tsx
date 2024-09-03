import { getCandidates } from "@/service/getCandidates";
import { Allocation, Candidate, Company, Feedback } from "@/Type";
import AllInterviewers from "./components/allInterviewers";
import { getFeedback } from "@/service/getFeedback";
import { getCompany } from "@/service/getCompany";
import { InterviewAllocation } from "@/service/InterviewAllocation";
import { getAllocation } from "@/service/getInterviewAllocation";
import { getUserById } from "@/service/getUserById";
import { notFound } from "next/navigation";
import { getDepartmentCordinatorByID } from "@/service/getDepartmentCordinatorById";

type Paramms = {
  params: {
    id: string;
  };
};

const DepartmentCordinatorPage = async ({ params }: Paramms) => {
  const departmentCoordinatorId = params.id;
  console.log(departmentCoordinatorId);

  // Get department coordinator details
  const user = await getUserById({ userId: departmentCoordinatorId });
  console.log(user);

  if (user == null || user.role !== "departmentCoordinator") {
    notFound();
  }

  const departmentCoordinatorDepartmentName =
    user.department_cordnator.department;
  console.log(departmentCoordinatorDepartmentName);

  // Fetch candidates and filter based on department
  const response = await getCandidates();
  const filterResponse = response.data.filter(
    (candidate: Candidate) =>
      candidate.department === departmentCoordinatorDepartmentName
  );

  const companyResponce = await getCompany();
  const feedbackResponse = await getFeedback();
  const allAllocation = await getAllocation();
  console.log(feedbackResponse);
  console.log(response.data);
  console.log(filterResponse);
  console.log(companyResponce.companies);

  // Initialize arrays to store the filtered data
  let initialCandidates: Candidate[] = filterResponse || [];
  let feedback: Feedback[] = feedbackResponse.data || [];
  let company: Company[] = companyResponce.companies || [];
  let allocation: Allocation[] = allAllocation.data || [];

  console.log(initialCandidates);
  console.log(company);

  return (
    <AllInterviewers
    department={departmentCoordinatorDepartmentName}
      departmentCordinatorId={departmentCoordinatorId}
      initialCandidates={initialCandidates}
      feedbacks={feedback}
      company={company}
      allocation={allocation}
    />
  );
};

export default DepartmentCordinatorPage;
