import { Button, CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { ArrowLeftIcon, PrinterIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useResolveReservationByCode } from "../service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { QRCodeSVG } from "qrcode.react";
import type { AdminApiResponse } from "../types";
import { getStatusLabel } from "@/utilities/status_utilities";

export default function ViewReservationPage() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const reservationDataFromState = location.state as AdminApiResponse | null;

  // Solo hacer petición si no hay datos en state pero sí hay código
  const shouldFetch = !reservationDataFromState && !!id;
  const {
    data: reservationDataFromAPI,
    isLoading,
    isError,
  } = useResolveReservationByCode(id || "", shouldFetch);

  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Ver reserva - La base");
  }, [changeTitle]);

  // Loading state - solo cuando se está haciendo petición
  if (shouldFetch && isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <CustomHeader
          to={ROUTES.Admin.ViewAllReservations}
          title="Ver reserva"
        />
        <div className="w-full animate-pulse bg-stone-50 h-[500px] mt-8"></div>
      </div>
    );
  }

  // Error state - solo cuando se está haciendo petición y falla
  if (shouldFetch && isError) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <CustomHeader
          to={ROUTES.Admin.ViewAllReservations}
          title="Ver reserva"
        />
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

  // Determinar qué datos usar: state o API
  const reservationData =
    reservationDataFromState ||
    (reservationDataFromAPI ? { data: reservationDataFromAPI } : null);

  // No hay datos ni en state ni de API, y no hay código para buscar
  if (!reservationData || !reservationData.data) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <CustomHeader
          to={ROUTES.Admin.ViewAllReservations}
          title="Ver reserva"
        />
        <Alert variant="default" className="mt-8">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>No encontrado</AlertTitle>
          <AlertDescription>
            No se pudo encontrar la reserva solicitada. Por favor, regresa a la
            lista de reservas.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { reservation, status } = reservationData.data;
  const price = `S/${parseFloat(reservation.price).toFixed(2)}`;
  const userName = `${reservation.user.first_name} ${reservation.user.last_name}`;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 mb-6">
        <Link
          to={ROUTES.Admin.ViewAllReservations}
          className="bg-stone-50 size-10 sm:size-12 flex items-center justify-center rounded-full border-none shadow-none transition-all hover:bg-stone-100"
        >
          <ArrowLeftIcon className="size-3.5 sm:size-4" />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 ">
          <span className="font-serif">Ver reserva </span>
          <span className="text-base sm:text-lg font-serif font-medium text-stone-500">
            ({getStatusLabel(status)})
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
                <p className="text-xs text-stone-500">
                  {reservation.space.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-stone-700 mb-1 border-t border-dashed border-stone-300 pt-4">
                  NOMBRE DEL CLIENTE:
                </p>
                <p className="text-sm text-stone-900">{userName}</p>
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

      <div className="mt-4 w-full lg:flex lg:justify-end">
        <Button className="bg-stone-900 text-white py-4 px-8 flex w-full lg:w-auto">
          <PrinterIcon className="size-4 gap-2 text-white" />
          Imprimir ticket
        </Button>
      </div>
    </div>
  );
}
