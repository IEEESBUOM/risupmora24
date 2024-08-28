"use server";
import { Allocation } from "@/Type";
import axios from "axios";
import toast from "react-hot-toast";

export const InterviewAllocation = async (data: Allocation) => {
  console.log(data);

  try {
    const response = await axios.post(
      `${process.env.APP_URL}/api/v1/admin/AllInterviewees`,
      {
        allocation_date: data.allocation_date,
        allocation_timeSlot: data.allocation_timeSlot,
        allocated_panel_number: data.allocated_panel_number,
        attendance: false,
        allocation_status: data.allocation_status,
        candidate_id: data.candidate_id,
        company_id: data.company_id,
        panelist_id: data.panelist_id,
        candidate: {},
        company: {},
        panelist: {},
      }
    );
    if (response.data) {
      return response.data;
    }
    throw new Error("Allocation failed");
  } catch (error) {
    console.error(error);
    throw error; // Ensure the error is thrown so it can be caught in useMutation
  }
};
