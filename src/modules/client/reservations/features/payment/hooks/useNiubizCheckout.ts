import { NIUBIZ_URL_JS, NIUBIZ_MERCHANT_ID } from "@/config";
import { toast } from "sonner";

interface NiubizCheckoutProps {
  sessionKey: string;
  purchaseNumber: string;
  amount: number;
  reservationId: string;
}

// Declaramos VisanetCheckout en el scope global de window para que TypeScript no se queje.
declare global {
  interface Window {
    VisanetCheckout?: {
      open: () => void;
    };
  }
}

export const useNiubizCheckout = () => {
  const openCheckout = ({
    sessionKey,
    purchaseNumber,
    amount,
    reservationId,
  }: NiubizCheckoutProps) => {
    document.getElementById("frmVisaNet")?.remove();

    const form = document.createElement("form");
    form.id = "frmVisaNet";
    form.action = `http://31.97.218.15:3001/visa-callback?purchaseNumber=${purchaseNumber}&amount=${amount}&reservation=${reservationId}`;
    form.style.display = "none";

    const script = document.createElement("script");
    script.src = NIUBIZ_URL_JS;
    script.setAttribute("data-sessiontoken", sessionKey);
    script.setAttribute("data-channel", "web");
    script.setAttribute("data-merchantid", NIUBIZ_MERCHANT_ID);
    script.setAttribute("data-purchasenumber", purchaseNumber || "");
    script.setAttribute("data-amount", amount.toString());

    script.setAttribute(
      "data-merchantlogo",
      `${window.location.origin}/logo_payment.png`
    );
    script.setAttribute("data-expirationminutes", "10");
    script.setAttribute("data-timeouturl", window.location.origin);
    script.setAttribute("data-formbuttoncolor", "#0A0A0A");

    script.onload = () => {
      console.log("Script de Niubiz cargado. Abriendo checkout...");
      if (window.VisanetCheckout) {
        window.VisanetCheckout.open();
      } else {
        console.error("El objeto VisanetCheckout no se encontró en window.");
        toast.error("Error al cargar la pasarela de pago", {
          description:
            "No se pudo inicializar el componente de pago de Niubiz.",
        });
      }
    };

    script.onerror = () => {
      toast.error("No se pudo cargar el script de la pasarela de pago.");
    };

    form.appendChild(script);
    document.body.appendChild(form);
  };

  return { openCheckout };
};
