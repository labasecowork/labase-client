export interface PaymentResult {
  success: boolean;
  message: string;
  purchaseNumber: string;
  transactionDate: string;
  card?: string;
  brand?: string;
  amount: number;
  currency: string;
  rawData: unknown;
}

export interface CreatePaymentResponse {
  purchaseNumber: string;
  sessionToken: string;
  amount: number;
}

export interface CreatePaymentData {
  reservationId: string;
  metadata: {
    antifraud: {
      clientIp: string;
      merchantDefineData: {
        MDD4: string;
        MDD32: string;
        MDD75: string;
        MDD76: number;
      };
    };
    dataMap: {
      urlAddress: string;
      serviceLocationCityName: string;
      serviceLocationCountrySubdivisionCode: string;
      serviceLocationCountryCode: string;
      serviceLocationPostalCode: string;
    };
  };
}

export interface PaymentResponse {
  id: string;
  transactionId: string;
  purchaseNumber: string;
  amount: number;
  authorizationCode: string;
  status: string;
  actionDescription: string;
  cardMasked: string;
  transactionDate: string;
  errorCode: number;
  errorMessage: string;
  createdAt: string;
  reservationId: string;
  userId: string;
}
