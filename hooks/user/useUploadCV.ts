// hooks/useUploadCV.ts
import { uploadCandidateCv } from "@/service/uploadCandidateCv";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
// import { uploadCVService } from '@/service/uploadCVService';
import { useSession } from "next-auth/react";

type UploadCVHookType = {
  cvUrl: string;
};

export const useUploadCV = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id as string;

  const { mutate: uploadCV, isPending: isUploading } = useMutation({
    mutationFn: ({ cvUrl }: UploadCVHookType) =>
      uploadCandidateCv({ cvUrl, userId }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidate", userId],
      });
    },
  });

  return { uploadCV, isUploading };
};
