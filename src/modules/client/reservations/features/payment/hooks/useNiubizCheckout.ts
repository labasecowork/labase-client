import { NIUBIZ_URL_JS, NIUBIZ_MERCHANT_ID, API_URL } from "@/config";

interface NiubizCheckoutProps {
  sessionKey: string;
  purchaseNumber: string;
  amount: number;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

export const useNiubizCheckout = () => {
  const openCheckout = ({
    sessionKey,
    purchaseNumber,
    amount,
    onSuccess,
    onError,
  }: NiubizCheckoutProps) => {
    const script = document.createElement("script");
    script.src = NIUBIZ_URL_JS;
    script.setAttribute("data-sessiontoken", sessionKey);
    script.setAttribute("data-channel", "web");
    script.setAttribute("data-merchantid", NIUBIZ_MERCHANT_ID);
    script.setAttribute("data-purchasenumber", purchaseNumber);
    script.setAttribute("data-amount", amount.toString());
    script.setAttribute("data-expirationminutes", "5");
    script.setAttribute("data-timeouturl", "/");
    script.setAttribute("data-merchantlogo", "URL_DE_TU_LOGO.png");
    script.setAttribute("data-formbuttoncolor", "#000000");
    // URL a la que tu backend recibirá la respuesta de Niubiz
    script.setAttribute(
      "data-action",
      `${API_URL}/payment/callback?purchaseNumber=${purchaseNumber}`,
    );

    script.onload = () => {
      try {
        (window as any).VisaCheckout.run(
          onSuccess,
          onError,
          undefined,
          undefined,
          (data: unknown) => {
            console.log("Datos de la configuración:", data);
          },
        );
      } catch (error) {
        console.error("Error al ejecutar VisaCheckout:", error);
        onError(error);
      }
    };
    script.onerror = () => {
      console.error("No se pudo cargar el script de Niubiz.");
      onError(new Error("No se pudo cargar el script de Niubiz."));
    };

    document.body.appendChild(script);
  };

  return { openCheckout };
};
