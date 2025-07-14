import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors/axios";
import type { Response } from "@/types/services";

interface VerifyParams {
  code: string;
  email: string;
}

const verifyAccountRequest = async ({
  code,
  email,
}: VerifyParams): Promise<Response> => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/register/verify-code",
    {
      code,
      email,
    }
  );
  return data;
};

export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: verifyAccountRequest,
  });
};
