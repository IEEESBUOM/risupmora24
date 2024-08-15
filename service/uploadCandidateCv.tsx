"use server";
import { RegistrationFormDataSendType, RegistrationFormDataType } from "@/Type";
import axios from "axios";
import toast from "react-hot-toast";

export const uploadCandidateCv = async ({
  cvUrl,
  userId,
}: {
  cvUrl: string;
  userId: string;
}) => {
  console.log("getCandidate");
  // export const getCandidate = async (data: string) => {
  // const data = "clyld3pa40000wb6y5trem706";
  console.log("🤷‍♀️🤷‍♂️👌😊", cvUrl);
  console.log("🤷‍♀️🤷‍♂️👌😊", userId);
  // if (!userId) return;

  try {
    const response = await axios.post(
      `${process.env.APP_URL}/api/v1/user/uploadCv`,
      {
        cvUrl,
        userId,
      }
    );
    if (response.data) {
      // console.log(response.data);
      return response.data;
    }
    toast.error("cv uoload failed");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
