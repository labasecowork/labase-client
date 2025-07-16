import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors/axios";
import type { Response } from "@/types/services";
import type { ChangePasswordData } from "../types";

type ConfirmPasswordPayload = ChangePasswordData & {
  email: string;
};

const confirmNewPasswordRequest = async (
  payload: ConfirmPasswordPayload
): Promise<Response> => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/password-reset/confirm",
    payload
  );
  return data;
};

export const useConfirmNewPassword = () => {
  return useMutation({
    mutationFn: confirmNewPasswordRequest,
  });
};
