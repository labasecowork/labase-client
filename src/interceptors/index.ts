import axios, { AxiosError } from "axios";
import { API_BASE_URL, API_BASE_URL_PROD, MODE } from "@/config";
import type { ErrorResponse } from "@/types";
import { getErrorMessageByStatus } from "@/utilities";

export const axiosInstance = axios.create({
  baseURL: MODE === "development" ? API_BASE_URL : API_BASE_URL_PROD,
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
  (error: AxiosError<ErrorResponse>) => {
    const status = error.response?.status;
    const message = getErrorMessageByStatus(status, error);

    return Promise.reject(new Error(message));
  }
);
