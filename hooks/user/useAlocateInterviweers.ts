import React from "react";

import { useMutation } from "@tanstack/react-query";
import { userRegistration } from "@/service/userRegistration";
import {
  Allocation,
  RegistrationFormDataSendType,
  RegistrationFormDataType,
} from "@/Type";
import toast from "react-hot-toast";
import { InterviewAllocation } from "@/service/InterviewAllocation";

type AllocationHookType = {
  allocationData: any;
};

export const useAlocateInterviewees = () => {
  console.log("useAlocateInterviewees");
  const { mutate: Allocation, isPending } = useMutation({
    mutationFn: ({ allocationData }: any) =>
      InterviewAllocation(allocationData),
    onSuccess: () => {
      toast.success("Allocation Success");
    },
    onError: (error) => {
      console.error("Allocation error:", error);
      toast.error("Allocation failed");
    },
  });

  return { Allocation, isPending };
};
