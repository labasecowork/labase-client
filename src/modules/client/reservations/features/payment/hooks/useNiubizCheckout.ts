import { NIUBIZ_URL_JS, NIUBIZ_MERCHANT_ID } from "@/config";

interface NiubizCheckoutProps {
  sessionKey: string;
  purchaseNumber: string;
  amount: number;
}

export const useNiubizCheckout = () => {
  const openCheckout = ({
    sessionKey,
    purchaseNumber,
    amount,
  }: NiubizCheckoutProps) => {
    const script = document.createElement("script");
    script.src = NIUBIZ_URL_JS;
    script.setAttribute("data-sessiontoken", sessionKey);
    script.setAttribute("data-channel", "web");
    script.setAttribute("data-merchantid", NIUBIZ_MERCHANT_ID);
    script.setAttribute(
      "data-merchantlogo",
      `${window.location.origin}/logo.png`
    );
    script.setAttribute("data-purchasenumber", purchaseNumber || "");
    script.setAttribute("data-amount", amount.toString());
    script.setAttribute("data-expirationminutes", "10");
    script.setAttribute("data-timeouturl", window.location.origin);
    script.setAttribute("action", "http://localhost:5173/finalizar");
    script.setAttribute("data-buttoncolor", "NAVY");
    script.setAttribute("data-formbuttoncolor", "#000000");

    script.onload = () => {
      console.log("Script de Visa cargado y ejecutado");
    };

    const frmVisaNet = document.getElementById("frmVisaNet");
    frmVisaNet?.appendChild(script);
  };

  return { openCheckout };
};
