import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes"; // Asegúrate de tener rutas para productos
import { Plus, LayoutGrid, List, PlusIcon } from "lucide-react";
import { CustomHeader } from "@/components/ui";

// La interfaz usa "Products" en lugar de "Articles"
interface HeaderProps {
  totalProducts: number;
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalProducts,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div>
      {/* Sección Superior: Título y Botones */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <CustomHeader title="Productos" to={ROUTES.Admin.ViewTools} />
          <p className="text-sm font-normal text-slate-400 ml-3 self-end py-1">
            {totalProducts} total products
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 self-end">
          <div className="flex items-center bg-stone-700 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-stone-900 text-white" : "text-stone-400 hover:bg-stone/50"}`}
            >
              <List className="size-5" />
            </button>
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-stone-900 text-white" : "text-stone-400 hover:bg-stone-900/50"}`}
            >
              <LayoutGrid className="size-5" />
            </button>
          </div>

          <Link
            to={ROUTES.Admin.CreateProduct}
            className="bg-stone-500 text-xs text-stone-50 font-medium hover:bg-stone-400 transition-all sm:text-sm px-8 py-3 rounded-full flex items-center gap-2"
          >
            <PlusIcon className="size-3 sm:size-4" />
            Agregar Producto
          </Link>
        </div>
      </div>
    </div>
  );
};
