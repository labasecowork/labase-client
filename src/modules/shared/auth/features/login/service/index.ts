import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors/axios";
import type { LoginCredentials, LoginResponse } from "../types";
import type { Response } from "@/types/services";

const loginRequest = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<Response<LoginResponse>>(
    "/auth/login",
    credentials
  );
  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene los datos esperados."
    );
  }
  return data.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
  });
};
