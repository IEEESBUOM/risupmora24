import { getCandidates } from "@/service/getCandidates";
import { Candidate, Company, Feedback } from "@/Type";
import AllInterviewers from "./components/allInterviewers";
import { getFeedback } from "@/service/getFeedback";
import { getCompany } from "@/service/getCompany";
import { InterviewAllocation } from "@/service/InterviewAllocation";

const AllInterviewersPage = async () => {
  const response = await getCandidates();
  const companyResponce = await getCompany();
  const feedbackResponse = await getFeedback();

  let initialCandidates: Candidate[] = [];
  let feedback: Feedback[] = [];
  let company: Company[] = [];
  console.log(response);
  console.log(companyResponce);
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
    console.log(companyResponce.data);
    company = companyResponce.data;
  } else {
    new Error("Failed to fetch company");
  }
  console.log(company);
  return (
    <AllInterviewers
      initialCandidates={initialCandidates}
      feedbacks={feedback}
      company={company}
    />
  );
};

export default AllInterviewersPage;
