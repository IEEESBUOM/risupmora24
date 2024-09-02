"use server";

import axios from "axios";
import toast from "react-hot-toast";

type CompanyType = {
  companyName: string;
  companyId: string;
  companyIcone: string;
};

export const getAllCompany = async () => {
  console.log(process.env.NEXT_PUBLIC_APP_URL);
  console.log("getAllCompany");
  try {
    const response = await axios.get(
      `${process.env.APP_URL}/api/v1/company/getAllCompany`
    );
    console.log(response.data);
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
    toast.error("getting company failed");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addCompany = async (data: CompanyType) => {
  // console.log(process.env.NEXT_PUBLIC_APP_URL);
  console.log("addCompany");
  try {
    const response = await axios.post(
      `${process.env.APP_URL}/api/v1/company/addCompany`,
      data
    );
    console.log(response.data);
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
    toast.error("adding company failed");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
