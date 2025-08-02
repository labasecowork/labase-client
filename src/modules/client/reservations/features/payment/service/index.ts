import axios from "axios";

export const generateSecurityToken = async (): Promise<string> => {
  const { data } = await axios.get<string>(`http://localhost:3001/token`);
  return data;
};

export const createPaymentSession = async (
  amount: number,
  purchaseNumber: string,
  token: string
): Promise<string> => {
  const { data } = await axios.post<{ sessionKey: string }>(
    `http://localhost:3001/token/session`,
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
    `http://localhost:3001/payment-result/${purchaseNumber}`
  );
  return data;
};
