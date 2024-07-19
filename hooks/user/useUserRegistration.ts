import React from "react";

import { useMutation } from "@tanstack/react-query";
import { userRegistration } from "@/service/userRegistration";
import { RegistrationFormDataSendType, RegistrationFormDataType } from "@/Type";

type RegistrationHookType = {
  registrationData: RegistrationFormDataSendType;
};

export const useUserRegistration = () => {
  const { mutate: Registration, isPending } = useMutation({
    mutationFn: ({ registrationData }: RegistrationHookType) =>
      userRegistration(registrationData),
  });

  return { Registration, isPending };
};
