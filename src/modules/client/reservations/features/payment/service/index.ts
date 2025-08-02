import axios from "axios";

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
