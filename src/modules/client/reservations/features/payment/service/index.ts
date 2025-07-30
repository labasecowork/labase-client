import { axiosInstance } from "@/interceptors";
import type { PaymentResult } from "../types";

export const generateSecurityToken = async (): Promise<string> => {
  const { data } = await axiosInstance.get<{ token: string }>(
    "/api/payment/token",
  );
  return data.token;
};

export const createPaymentSession = async (
  amount: number,
  purchaseNumber: string,
  token: string,
): Promise<string> => {
  const { data } = await axiosInstance.post<{ sessionKey: string }>(
    "/api/payment/session",
    {
      amount,
      purchaseNumber,
      token,
    },
  );
  return data.sessionKey;
};

export const getPaymentResult = async (
  purchaseNumber: string,
): Promise<PaymentResult> => {
  const { data } = await axiosInstance.get<PaymentResult>(
    `/api/payment/result/${purchaseNumber}`,
  );
  return data;
};
