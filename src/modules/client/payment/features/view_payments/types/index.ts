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
  reservation: {
    id: string;
    purchaseNumber: string;
    userId: string;
    spaceId: string;
    startTime: string;
    endTime: string;
    people: number;
    fullRoom: boolean;
    codeQr: string;
    price: string;
    status: string;
    createdAt: string;
  };
}
