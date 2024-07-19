import { RegistrationFormDataType } from "@/Type";
import axios from "axios";
import toast from "react-hot-toast";

export const userRegistration = async (data: RegistrationFormDataType) => {
  console.log(data);

  try {
    const response = await axios.post("/api/v1/user/registration", data);
    if (response.data) {
      return response.data;
    }
    toast.error("Registration failed");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
