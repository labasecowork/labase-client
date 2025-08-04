import { CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { Building2Icon, QrCodeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => (
  <div className="flex items-center justify-between gap-4 flex-wrap">
    <CustomHeader title="Reservas" />
    <div className="flex items-center gap-4">
      <Link
        to={ROUTES.Admin.ScanCodeQRReservation}
        className="bg-stone-200 text-xs sm:text-sm flex items-center justify-center gap-2 text-stone-900 font-medium hover:bg-stone-300 transition-all px-8 py-3 rounded-full"
      >
        <QrCodeIcon className="size-3 sm:size-4" />
        Escanear código QR
      </Link>

      <Link
        to={ROUTES.Admin.ViewSpaces}
        className="bg-stone-500 text-xs sm:text-sm flex items-center justify-center gap-2 text-stone-50 font-medium hover:bg-stone-400 transition-all px-8 py-3 rounded-full"
      >
        <Building2Icon className="size-3 sm:size-4" />
        Gestionar espacios
      </Link>
    </div>
  </div>
);
