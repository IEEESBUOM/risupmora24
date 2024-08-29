import axios from "axios";
import { Allocation } from "@/Type";

export const InterviewAllocation = async (data: { Allocation: Allocation }) => {
  console.log("here...................");
  console.log("InterviewAllocation");
  console.log(data);

  const item = data.Allocation; // Access the Allocation object

  try {
    // Step 1: Delete existing allocations for the candidate
    const deleteResponse = await axios.delete(
      `http://localhost:3000/api/v1/admin/deleteAllInterviewees`,
      {
        data: {
          candidate_id: item.candidate_id,
        },
      }
    );
    console.log(
      `Deleted allocations for candidate_id: ${item.candidate_id}`,
      deleteResponse
    );

    // Step 2: Post the new allocation data
    const postResponse = await axios.post(
      `http://localhost:3000/api/v1/admin/AllInterviewees`,
      {
        allocation_date: item.allocation_date,
        allocation_timeSlot: item.allocation_timeSlot,
        allocated_panel_number: item.allocated_panel_number,
        attendance: false,
        allocation_status: item.allocation_status,
        candidate_id: item.candidate_id,
        company_id: item.company_id,
        panelist_id: item.panelist_id,
        candidate: {},
        company: {},
        panelist: {},
      }
    );
    console.log(
      `Posted new allocation for candidate_id: ${item.candidate_id}`,
      postResponse
    );

    if (!postResponse.data) {
      throw new Error("Allocation failed");
    }
  } catch (error) {
    console.log(error);
    console.error("Error in InterviewAllocation:", error);
    throw error; // Ensure the error is thrown so it can be caught in useMutation
  }
};
