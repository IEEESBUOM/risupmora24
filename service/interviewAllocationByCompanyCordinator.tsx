import axios from "axios";
import { Allocation } from "@/Type";

export const InterviewAllocationByCompanyCordinator = async (data: {
  Allocation: Allocation;
}) => {
  console.log("here...................");
  console.log("InterviewAllocation");
  console.log(data);

  const item = data.Allocation; // Access the Allocation object

  try {
    const putResponse = await axios.put(
      `http://localhost:3000/api/v1/admin/UpdateInterviewByCompanyCordinator`,
      {
        allocation_date: item.allocation_date,
        allocation_timeSlot: item.allocation_timeSlot,
        allocated_panel_number: item.allocated_panel_number,
        attendance: false,
        allocation_status: item.allocation_status,
        candidate_id: item.candidate_id,
        company_id: item.company_id,
        panelist_id: item.panelist_id,
      }
    );
    console.log(
      `Updated allocation for candidate_id: ${item.candidate_id}`,
      putResponse
    );

    if (!putResponse.data) {
      throw new Error("Update failed");
    }
  } catch (error) {
    console.log(error);
    console.error("Error in InterviewAllocation:", error);
    throw error; // Ensure the error is thrown so it can be caught in useMutation
  }
};
