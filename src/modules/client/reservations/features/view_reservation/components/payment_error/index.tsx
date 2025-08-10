import { XCircleIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { PaymentResponse } from "@/modules/client/payment/types";

interface Props {
  paymentResult: PaymentResponse;
}

export const PaymentError = ({ paymentResult }: Props) => {
  return (
    <>
      {/* Error */}
      <XCircleIcon className="size-15 text-rose-800 mb-4 mx-auto" />
      <h3 className="text-xl font-bold text-stone-900 mb-1 font-serif">
        Error al procesar el pago
      </h3>
      <p className="text-stone-500 text-sm mb-6">
        Lo sentimos, pero no pudimos procesar tu pago. Por favor, intenta
        nuevamente.
      </p>

      {/* Detalles del error */}
      <div className="w-full bg-stone-100 p-6 space-y-4 text-left">
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-500">ID de la transacción</span>
            <span className="text-stone-900 font-mono tracking-tighter font-medium">
              {paymentResult?.purchaseNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Fecha</span>
            <span className="text-stone-900 font-mono tracking-tighter font-medium">
              {paymentResult?.transactionDate &&
                (() => {
                  // Convertir formato "250810071257" a fecha legible
                  const dateStr = paymentResult.transactionDate;
                  const year = "20" + dateStr.substring(0, 2);
                  const month = dateStr.substring(2, 4);
                  const day = dateStr.substring(4, 6);
                  const hour = dateStr.substring(6, 8);
                  const minute = dateStr.substring(8, 10);
                  const date = new Date(
                    `${year}-${month}-${day}T${hour}:${minute}:00`
                  );
                  return format(date, "dd.MM.yy HH:mm", {
                    locale: es,
                  });
                })()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Monto</span>
            <span className="text-stone-900 font-mono tracking-tighter font-medium">
              S/{paymentResult?.amount}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Estado</span>
            <span className="text-rose-700 font-medium font-mono tracking-tighter">
              ✗ Error
            </span>
          </div>
          {paymentResult?.actionDescription && (
            <div className="flex justify-between">
              <span className="text-stone-500">Motivo</span>
              <span className="text-stone-900 text-right font-mono tracking-tighter font-medium">
                {paymentResult.actionDescription}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
