import { CustomHeader } from "@/components/ui";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const Header = () => (
  <div className="flex items-center justify-between gap-4 flex-wrap">
    <CustomHeader title="Gestionar Espacios" />
    <Link
      to={ROUTES.Admin.CreateSpace}
      className="bg-stone-900 text-xs text-white font-medium hover:bg-stone-700 transition-all sm:text-sm px-8 py-3 rounded-full flex items-center gap-2"
    >
      <PlusIcon className="size-3 sm:size-4" />
      Crear Espacio
    </Link>
  </div>
);
