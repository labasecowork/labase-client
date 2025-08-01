import { ROUTES } from "@/routes/routes";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import { useResolveReservation } from "../service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { QRCodeSVG } from "qrcode.react";
import { useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import { getStatusLabel } from "@/utilities/status_utilities";
import { CustomHeader } from "@/components/ui";
import { useInitializePayment } from "../../payment/hooks/useInitializePayment";
import { useNiubizCheckout } from "../../payment/hooks/useNiubizCheckout";
import { toast } from "sonner";

export default function ViewReservationPage() {
  const { id } = useParams<{ id: string }>();
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const {
    data: reservationData,
    isLoading,
    isError,
  } = useResolveReservation(id!);
  const { changeTitle } = useTitle();

  // primero se haría esto
  const { mutate: initializePayment } = useInitializePayment();

  // luego se haría esto
  const { openCheckout } = useNiubizCheckout();

  useEffect(() => {
    changeTitle("Ver reserva - La base");
  }, [changeTitle]);

  if (isLoading) {
    return (
      <div className="px-4 py-10 w-full mx-auto max-w-5xl">
        <CustomHeader title="Ver reserva" to={ROUTES.Client.ViewReservations} />
        <div className="w-full animate-pulse bg-stone-50 h-[500px] mt-8"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-10">
        <CustomHeader title="Ver reserva" to={ROUTES.Client.ViewReservations} />
        <div className="bg-red-500/10 p-10 sm:p-24 gap-2 mt-8">
          <div className="mx-auto max-w-md text-center">
            <ExclamationTriangleIcon className="size-10 text-rose-800 mx-auto" />
            <div>
              <h2 className="text-xl font-serif font-bold text-rose-800 mt-4">
                Ups! Sucedio un error
              </h2>
              <p className="text-xs sm:text-sm text-rose-700 mt-0 sm:mt-2">
                No se pudo encontrar la reserva solicitada, posiblemente no
                existe o ya fue cancelada, si crees que esto es un error, por
                favor contacta a soporte.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!reservationData) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <Alert variant="default">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>No encontrado</AlertTitle>
          <AlertDescription>
            No se pudo encontrar la reserva solicitada.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { reservation, status } = reservationData;
  const statusLabel = getStatusLabel(status);
  const price = `S/${parseFloat(reservation.price).toFixed(2)}`;
  const calculatedAmount = parseFloat(reservation.price);

  const handlePaymentProcess = () => {
    initializePayment(
      { amount: calculatedAmount },
      {
        onSuccess: ({ sessionKey, purchaseNumber }) => {
          setPurchaseNumber(purchaseNumber);
          toast.info("Iniciando pasarela de pago...");

          openCheckout({
            sessionKey,
            purchaseNumber,
            amount: calculatedAmount,
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
    <>
      {/* Form requerido por Niubiz */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 mb-">
          <Link
            to={ROUTES.Client.ViewReservations}
            className="bg-stone-50 size-10 sm:size-12 flex items-center justify-center rounded-full border-none shadow-none transition-all hover:bg-stone-100"
          >
            <ArrowLeftIcon className="size-3.5 sm:size-4" />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 ">
            <span className="font-serif">Ver reserva </span>
            <span className="text-base sm:text-lg font-serif font-medium text-stone-500">
              ({statusLabel})
            </span>
          </h2>
        </div>

        <div className="w-full mt-6">
          {/* Ticket de Resumen */}
          <div className="bg-stone-100 relative w-full max-w-[400px] mx-auto lg:max-w-none">
            {/* Encabezado del ticket */}
            <div className="text-left px-6 sm:px-10 py-4 bg-stone-200">
              <h3 className="text-xl font-bold text-stone-900">RESERVA</h3>
              <p className="text-xs text-stone-500 mt-1">
                Ticket #{reservation.id.split("-")[0]}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8 lg:gap-16 px-6 sm:px-10 pb-10 mt-10">
              <div>
                {/* Información del espacio */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-stone-700 mb-1">
                    ESPACIO:
                  </p>
                  <p className="text-sm text-stone-900">
                    {reservation.space.name}
                  </p>
                </div>

                {/* Línea punteada separadora */}
                <div className="border-b border-dashed border-stone-300 my-4"></div>

                {/* Información de fecha y hora */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-stone-700 mb-1">
                      FECHA:
                    </p>
                    <p className="text-sm text-stone-900">
                      {format(new Date(reservation.startTime), "dd/MM/yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-700 mb-1">
                      HORARIO:
                    </p>
                    <p className="text-sm text-stone-900">
                      {format(new Date(reservation.startTime), "HH:mm")} -{" "}
                      {format(new Date(reservation.endTime), "HH:mm", {
                        locale: es,
                      })}
                    </p>
                  </div>
                </div>

                {/* Línea punteada separadora */}
                <div className="border-b border-dashed border-stone-300 my-4"></div>

                {/* Información de personas */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-stone-700 mb-1">
                      PERSONAS:
                    </p>
                    <p className="text-sm text-stone-900">
                      {reservation.people}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-700 mb-1">
                      ESPACIO COMPLETO:
                    </p>
                    <p className="text-sm text-stone-900">
                      {reservation.fullRoom ? "Sí" : "No"}
                    </p>
                  </div>
                </div>

                <div className="block lg:hidden">
                  <p className="text-xs font-semibold text-stone-700 mb-1 border-t border-dashed border-stone-300 pt-4">
                    CÓDIGO DE RESERVA:
                  </p>
                  <div className="flex justify-center my-4 w-full">
                    <QRCodeSVG
                      value={reservation.codeQr}
                      bgColor="#f5f5f4"
                      size={250}
                    />
                  </div>
                </div>

                {/* Total estimado */}
                <div className="border-t border-dashed border-stone-300 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-stone-700">
                      TOTAL ESTIMADO:
                    </p>
                    <p className="text-lg font-bold text-stone-900">{price}</p>
                  </div>
                  <button
                    onClick={handlePaymentProcess}
                    className="w-full mt-4 bg-stone-900 text-white py-2 px-4 rounded hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    Procesar Pago
                  </button>
                </div>
              </div>
              <div className="hidden lg:flex justify-center lg:justify-start items-center h-full">
                <div>
                  <QRCodeSVG
                    value={reservation.codeQr}
                    bgColor="#f5f5f4"
                    size={250}
                  />
                </div>
              </div>
            </div>

            {/* Círculos de perforación adicionales - Lado izquierdo */}
            <div className="absolute -left-3 top-[50%] size-6 lg:size-8 bg-white rounded-full"></div>

            {/* Círculos de perforación adicionales - Lado derecho */}
            <div className="absolute -right-3 top-[50%] size-6 lg:size-8 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}
