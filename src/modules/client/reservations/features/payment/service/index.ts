import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import axios from "axios";
import type { CreatePaymentData, CreatePaymentResponse } from "../types";

export const generateSecurityToken = async (): Promise<string> => {
  const { data } = await axios.get<string>(`https://test.labase.pe/token`);
  return data;
};

export const createPaymentSession = async (
  amount: number,
  purchaseNumber: string,
  token: string
): Promise<string> => {
  const { data } = await axios.post<{ sessionKey: string }>(
    `https://test.labase.pe/token/session`,
    {
      amount,
      purchaseNumber,
      token,
    }
  );
  return data.sessionKey;
};

export const getPaymentResult = async (purchaseNumber: string) => {
  const { data } = await axios.get(
    `https://test.labase.pe/payment-result/${purchaseNumber}`
  );
  return data;
};

export const createPayment = async (
  data: CreatePaymentData
): Promise<CreatePaymentResponse> => {
  const { data: response } = await axiosInstance.post<
    Response<CreatePaymentResponse>
  >(`/payment/create-payment`, data);

  if (!response.data) {
    throw new Error(
      "Error al crear el pago, el servidor no contiene los datos del pago creado."
    );
  }

  return response.data;
};
