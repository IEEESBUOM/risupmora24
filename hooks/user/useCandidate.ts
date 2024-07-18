import { getCandidate } from "@/service/getCandidate";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
// import { getMe } from "../services/candidateApi";

export const useCandidate = () => {
  const session = useSession();

  const userId = session.data?.user?.token?.sub as string;
  console.log(userId);

  const { data: candidate, isPending } = useQuery({
    queryKey: ["candidate", userId],
    queryFn: () => getCandidate({ userId }),
    // queryFn: () => getCandidate(userId),
  });

  // const { data: candidate, isPending } = useQuery({
  //   queryKey: ["candidate", userId],
  //   queryFn: () => getCandidate(userId),
  // });

  return { candidate, isPending };
};
