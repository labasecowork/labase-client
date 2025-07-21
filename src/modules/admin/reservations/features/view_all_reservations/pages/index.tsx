import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { QrCodeIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ReservationTable } from "../components";

export default function ViewAllReservationsPage() {
  const { changeTitle } = useTitle();
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

      <div className="bg-stone-50 overflow-hidden mt-8">
        <ReservationTable />
      </div>
    </div>
  );
}
