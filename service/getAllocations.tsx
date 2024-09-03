"use server";

import axios from "axios";
import toast from "react-hot-toast";

export const fetchAllocations = async (candidateId: string) => {
  if (!candidateId) {
    toast.error("Invalid candidate ID");
    return null;
  }

  try {
    const response = await axios.get(
      `/api/v1/candidate/getAllocations?candidateId=${candidateId}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error("Failed to fetch allocations");
      return null;
    }
  } catch (error) {
    console.error("Error fetching allocations:", error);
    toast.error("An error occurred while fetching allocations");
    return null;
  }
};
