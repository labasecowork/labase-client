import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type {
  CreatePaymentData,
  CreatePaymentResponse,
  PaymentResponse,
} from "../types";

export const getPaymentResult = async (
  purchaseNumber: string
): Promise<PaymentResponse> => {
  const { data } = await axiosInstance.get<PaymentResponse>(
    `/payment/result/${purchaseNumber}`
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
