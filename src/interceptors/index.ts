import axios, { type AxiosError } from "axios";
import { API_URL } from "@/config/env";
import type { ErrorResponse } from "@/types/services";
import { getErrorMessageByStatus } from "@/utilities/error_utilities";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("TOKEN_AUTH");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse> & { customMessage?: string }) => {
    const status = error.response?.status;
    const defaultMessage = getErrorMessageByStatus(status, error);

    if (!error.customMessage) {
      error.customMessage = defaultMessage;
    }

    return Promise.reject(error);
  }
);
