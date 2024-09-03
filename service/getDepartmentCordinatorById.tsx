import { Panelist } from "@/Type";
import axios from "axios";
import toast from "react-hot-toast";

export const getDepartmentCordinatorByID = async (cordinator_id: any) => {
  console.log(cordinator_id);
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/admin/getDepartmentCordinatorById`,
      {
        params: { cordinator_id },
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
