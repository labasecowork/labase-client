import { CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => (
  <div className="flex items-end justify-between gap-4 flex-wrap">
    <CustomHeader title="Gestionar Artículos" to={ROUTES.Admin.ViewTools} />
    <Link
      to={ROUTES.Admin.CreateArticle}
      className="bg-stone-200 text-xs text-stone-700 font-medium hover:bg-stone-300 transition-all sm:text-sm px-8 py-3 rounded-full flex items-center gap-2"
    >
      <PlusIcon className="size-3 sm:size-4" />
      Crear Artículo
    </Link>
  </div>
);
