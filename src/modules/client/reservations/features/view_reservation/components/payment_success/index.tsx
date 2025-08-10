import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { PaymentResponse } from "@/modules/client/payment/types";
import { toast } from "sonner";

interface Props {
  paymentResult: PaymentResponse;
}

export const PaymentSuccess = ({ paymentResult }: Props) => {
  return (
    <>
      {/* Éxito */}
      <div className="w-16 h-16 bg-emerald-800/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircleIcon className="size-10 text-emerald-800" />
      </div>
      <h3 className="text-xl font-bold text-stone-900 mb-1 font-serif">
        Pago exitoso
      </h3>
      <p className="text-stone-500 text-sm mb-6">
        Pago completado exitosamente por S/{paymentResult.amount}
      </p>

      {/* Detalles de transacción */}
      <div className="w-full bg-stone-100 p-6 space-y-3 text-left">
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-500">ID de transacción</span>
            <span className="text-stone-900 font-mono tracking-tighter font-medium">
              {paymentResult.purchaseNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Fecha</span>
            <span className="text-stone-900 font-mono tracking-tighter font-medium">
              {(() => {
                // Convertir formato "250802112846" a fecha legible
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
            <span className="text-stone-500">Tarjeta</span>
            <span className="text-stone-900 font-mono tracking-tighter">
              {paymentResult.cardMasked}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Marca</span>
            <span className="text-stone-900 uppercase font-mono tracking-tighter font-medium">
              {paymentResult.cardMasked.slice(-4)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Monto</span>
            <span className="text-stone-900 font-mono tracking-tighter font-medium">
              S/{paymentResult.amount}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Estado</span>
            <span className="text-emerald-800 font-medium font-mono tracking-tighter">
              ✓ Aprobado
            </span>
          </div>
        </div>
      </div>

      <Button
        className="w-full mt-6 bg-emerald-800 hover:bg-emerald-700 text-white"
        onClick={() => {
          // Aquí puedes agregar la lógica para descargar el recibo
          toast.info("Descargando recibo...");
        }}
      >
        <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
        Descargar recibo
      </Button>
    </>
  );
};
