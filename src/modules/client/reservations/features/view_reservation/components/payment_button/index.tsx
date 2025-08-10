import { useInitializePayment } from "@/modules/client/payment/hooks/useInitializePayment";
import { useNiubizCheckout } from "@/modules/client/payment/hooks/useNiubizCheckout";
import { cn } from "@/utilities";
import { CreditCardIcon } from "@heroicons/react/20/solid";
import { toast } from "sonner";

interface Props {
  reservationId: string;
  calculatedAmount: number;
}
export const PaymentButton = ({ reservationId, calculatedAmount }: Props) => {
  const { mutate: initializePayment, isPending } = useInitializePayment();
  const { openCheckout } = useNiubizCheckout();

  const handlePaymentProcess = () => {
    initializePayment(
      { reservationId },
      {
        onSuccess: ({ sessionToken, purchaseNumber }) => {
          toast.info("Iniciando pasarela de pago", {
            description:
              "Estamos creando la sesión de pago para tu reserva, por favor espera un momento...",
          });

          openCheckout({
            sessionKey: sessionToken,
            purchaseNumber,
            amount: calculatedAmount,
            reservationId,
          });
        },
        onError: (err) => {
          toast.error("Error al inicializar el pago", {
            description: err.message,
          });
        },
      }
    );
  };
  return (
    <div className="w-full flex justify-end lg:max-w-none max-w-[700px] mx-auto">
      <button
        onClick={handlePaymentProcess}
        className={cn(
          "w-fit mt-4 bg-stone-900 text-white py-3 px-8 rounded-full hover:bg-stone-700 transition-colors cursor-pointer text-sm  flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-stone-900",
          isPending && "opacity-50"
        )}
        disabled={isPending}
      >
        <CreditCardIcon className="size-4" />
        {isPending ? "Procesando..." : "Procesar pago"}
      </button>
    </div>
  );
};
