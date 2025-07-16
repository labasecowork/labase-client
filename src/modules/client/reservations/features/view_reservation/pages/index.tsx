import { ROUTES } from "@/routes/routes";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import { useResolveReservationByCode } from "../service";
import { LoaderSplash } from "@/components/ui";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { QRCodeSVG } from "qrcode.react";

export default function ViewReservationPage() {
  const { code } = useParams<{ code: string }>();
  const {
    data: reservationData,
    isLoading,
    isError,
    error,
  } = useResolveReservationByCode(code!);

  if (isLoading) {
    return <LoaderSplash />;
  }

  if (isError) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
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

  const price = `S/${parseFloat(reservation.price).toFixed(2)}`;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 mb-6">
        <Link
          to={ROUTES.Client.ViewReservations}
          className="bg-stone-50 size-12 flex items-center justify-center rounded-full border-none shadow-none transition-all hover:bg-stone-100"
        >
          <ArrowLeftIcon className="size-4" />
        </Link>
        <h2 className="text-2xl font-bold text-stone-900">
          Ver reserva{" "}
          <span className="text-base font-normal text-stone-500">
            ({status})
          </span>
        </h2>
      </div>

      <div className="w-full">
        <div className="bg-stone-100 p-6 relative max-w-[400px]">
          <div className="text-center border-b border-dashed border-stone-300 pb-4 mb-4">
            <h3 className="text-lg font-bold text-stone-900">RESERVA</h3>
            <p className="text-xs text-stone-500 mt-1">
              Ticket #{reservation.id.split("-")[0]}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-xs font-semibold text-stone-700 mb-1">
              ESPACIO:
            </p>
            <p className="text-sm text-stone-900">{reservation.space.name}</p>
          </div>

          <div className="border-b border-dashed border-stone-300 my-4"></div>

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

          <div className="border-b border-dashed border-stone-300 my-4"></div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-stone-700 mb-1">
                PERSONAS:
              </p>
              <p className="text-sm text-stone-900">{reservation.people}</p>
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

          <div className="border-t-2 border-dashed border-stone-300 my-4 pt-4 flex justify-between items-center">
            <p className="text-sm font-semibold text-stone-700">TOTAL:</p>
            <p className="text-lg font-bold text-stone-900">{price}</p>
          </div>

          <div className="border-t border-dashed border-stone-300 my-4 pt-4">
            <p className="text-xs font-semibold text-stone-700 mb-1">
              CÓDIGO DE RESERVA:
            </p>
            <div className="flex justify-center my-4">
              <QRCodeSVG value={reservation.codeQr} size={200} />
            </div>
          </div>

          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
