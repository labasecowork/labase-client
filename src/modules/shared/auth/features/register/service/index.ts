import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors/axios";
import type { RegisterData } from "../types";
import type { Response } from "@/types/services";

const registerRequest = async (
  registerData: RegisterData
): Promise<Response> => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/register/request",
    registerData
  );
  return data;
};

export const useRequestRegister = () => {
  return useMutation({
    mutationFn: registerRequest,
  });
};
