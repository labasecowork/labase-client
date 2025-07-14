import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors/axios";
import type { Response } from "@/types/services";

interface VerifyParams {
  code: string;
  email: string;
}

const verifyPasswordResetRequest = async ({
  code,
  email,
}: VerifyParams): Promise<Response> => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/password-reset/verify-code",
    {
      code,
      email,
    }
  );
  return data;
};

export const useVerifyPasswordResetCode = () => {
  return useMutation({
    mutationFn: verifyPasswordResetRequest,
  });
};
