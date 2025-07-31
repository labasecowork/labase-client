import { useMutation } from "@tanstack/react-query";
import { createPaymentSession, generateSecurityToken } from "../service";
import { generatePurchaseNumber } from "@/utilities/payment_utilities";

interface InitializePaymentData {
  amount: number;
}

export const useInitializePayment = () => {
  return useMutation({
    mutationFn: async ({ amount }: InitializePaymentData) => {
      const purchaseNumber = generatePurchaseNumber();
      const token = await generateSecurityToken();
      const sessionKey = await createPaymentSession(
        amount,
        purchaseNumber,
        token
      );

      if (!sessionKey) {
        throw new Error("La llave de sesión no pudo ser generada.");
      }

      return { sessionKey, purchaseNumber };
    },
  });
};
