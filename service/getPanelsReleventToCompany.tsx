import { Panelist } from "@/Type";
import axios from "axios";
import toast from "react-hot-toast";

export const getPannels = async (company_id: any) => {
  console.log(company_id);
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/admin/getPanelsForAllInterviewees`,
      {
        params: { company_id },
      }
    );
    if (response.data) {
      return response.data;
    }
    toast.error("Failed to get Panels");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
