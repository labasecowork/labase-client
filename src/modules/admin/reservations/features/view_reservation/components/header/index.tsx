import { ROUTES } from "@/routes/routes";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { getStatusLabel } from "@/utilities/status_utilities";

type HeaderProps = {
  status?: string;
};

export const Header = ({ status }: HeaderProps) => (
  <div className="flex flex-col gap-4 mb-6">
    <Link
      to={ROUTES.Admin.ViewAllReservations}
      className="bg-stone-50 size-10 sm:size-12 flex items-center justify-center rounded-full border-none shadow-none transition-all hover:bg-stone-100"
    >
      <ArrowLeftIcon className="size-3.5 sm:size-4" />
    </Link>
    <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
      <span className="font-serif">Ver reserva </span>
      {status && (
        <span className="text-base sm:text-lg font-serif font-medium text-stone-500">
          ({getStatusLabel(status)})
        </span>
      )}
    </h2>
  </div>
);
