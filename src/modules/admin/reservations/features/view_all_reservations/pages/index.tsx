import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { QrCodeIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetReservations } from "../service";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { ReservationTable } from "../components";

export default function ViewAllReservationsPage() {
  const { changeTitle } = useTitle();
  const { data: reservations, isLoading, isError } = useGetReservations();

  useEffect(() => {
    console.log(reservations?.data?.data);
  }, [reservations]);

  useEffect(() => {
    changeTitle("Ver reservas - La base");
  }, []);
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <CustomHeader title="Reservas" />
        <Link
          to={ROUTES.Admin.ScanCodeQRReservation}
          className="bg-stone-200 text-xs sm:text-sm flex items-center justify-center gap-2 text-stone-900 font-medium hover:bg-stone-300 transition-all px-8 py-3 rounded-full"
        >
          <QrCodeIcon className="size-3 sm:size-4" />
          Escanear código QR
        </Link>
      </div>
      {isLoading ? (
        <div className="bg-stone-50 overflow-hidden animate-pulse max-h-[675px] h-full"></div>
      ) : isError ? (
        <div className="col-span-1 lg:col-span-1 w-full h-full max-h-[675px] bg-rose-500/10 flex items-center justify-center flex-col text-center px-8">
          <ExclamationTriangleIcon className="size-10 text-rose-800" />
          <h2 className="text-rose-800 text-2xl font-serif mt-4 font-bold">
            Error al cargar las reservas
          </h2>
          <p className="text-rose-700 text-xs sm:text-sm mt-0  sm:mt-2">
            Sucedio un error al cargar las reservas, porfavor intenta
            nuevamente, si el problema persiste, por favor contacta al soporte.
          </p>
        </div>
      ) : (
        <div
          className="bg-stone-50 w-full mt-8"
          style={{ height: "calc(100vh - 250px)" }}
        >
          <ReservationTable reservations={reservations?.data?.data || []} />
        </div>
      )}
    </div>
  );
}
