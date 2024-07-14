
import axios from "axios";
import toast from "react-hot-toast";

export const getCandidates = async () => {
  try {
    const response = await axios.get("/api/v1/candidate/getCandidates");
    if (response.data) {
      return response.data;
    }
    toast.error("Failed to get candidates");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};