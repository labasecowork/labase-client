import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors/axios";
import type { ForgotPasswordData } from "../types";
import type { Response } from "@/types/services";

const requestPasswordResetRequest = async (
  resetData: ForgotPasswordData
): Promise<Response> => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/password-reset/request",
    resetData
  );
  return data;
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: requestPasswordResetRequest,
  });
};
