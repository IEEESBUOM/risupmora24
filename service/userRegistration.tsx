"use server";
import { RegistrationFormDataSendType } from "@/Type";
import axios from "axios";
import toast from "react-hot-toast";

export const userRegistration = async (data: RegistrationFormDataSendType) => {
  console.log(data);
  console.log(process.env.APP_URL);

  try {
    const response = await axios.post(
      `${process.env.APP_URL}/api/v1/user/registration`,
      data
    );
    if (response.data) {
      return response.data;
    }
    throw new Error("Registration failed");
  } catch (error) {
    console.error(error);
    throw error; // Ensure the error is thrown so it can be caught in useMutation
  }
};
