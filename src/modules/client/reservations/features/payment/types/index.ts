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
