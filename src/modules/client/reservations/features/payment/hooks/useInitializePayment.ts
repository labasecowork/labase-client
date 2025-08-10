import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../service";

interface InitializePaymentData {
  reservationId: string;
}

export const useInitializePayment = () => {
  return useMutation({
    mutationFn: async ({ reservationId }: InitializePaymentData) => {
      // TODO: Improve build
      const data = {
        reservationId: reservationId,
        metadata: {
          antifraud: {
            clientIp: "192.168.0.1",
            merchantDefineData: {
              MDD4: "micorreo@gmail.com",
              MDD32: "33779159",
              MDD75: "Invigado",
              MDD76: 1,
            },
          },
          dataMap: {
            urlAddress: "https://example.com/servicio",
            serviceLocationCityName: "Madrid",
            serviceLocationCountrySubdivisionCode: "ESP",
            serviceLocationCountryCode: "ESP",
            serviceLocationPostalCode: "28001",
          },
        },
      };
      const { sessionToken, purchaseNumber, amount } = await createPayment(
        data
      );

      if (!sessionToken) {
        throw new Error("La llave de sesión no pudo ser generada.");
      }

      return { sessionToken, purchaseNumber, amount };
    },
  });
};
