import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { MoreHorizontal, Edit, Trash2, Package } from "lucide-react";
import type { Product } from "../../types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

const formatPrice = (price: number | [number, number]) => {
  if (Array.isArray(price)) {
    return `$${price[0].toFixed(2)} – ${price[1].toFixed(2)}`;
  }
  return `$${price.toFixed(2)}`;
};

const StockInfo: React.FC<{ stock: number }> = ({ stock }) => {
  let color = "text-emerald-600";
  let text = "In Stock";

  if (stock === 0) {
    color = "text-red-500";
    text = "Out of Stock";
  } else if (stock <= 15) {
    color = "text-yellow-600";
    text = "Low Stock";
  }

  return (
    <>
      <span>•</span>
      <span className="flex items-center gap-1">
        <Package className="size-3" />
        <span className={color}>{text}</span>
        <span className="text-stone-500">({stock} units)</span>
      </span>
    </>
  );
};

export const ProductsList: React.FC<{ products: Product[] }> = ({
  products,
}) => {
  const navigate = useNavigate();

  const handleEdit = (productId: string) => {
    navigate(ROUTES.Admin.EditProduct);
  };

  const handleDelete = (productId: string) => {
    console.log("Delete product:", productId);
  };

  return (
    <div className="flex flex-col gap-3 mt-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-white rounded-lg border border-stone-200 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-4 flex-1">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="size-14 rounded-md object-cover bg-stone-100 flex-shrink-0"
            />
            <div>
              <p className="font-semibold text-stone-900 text-base">
                {product.name}
              </p>
              <div className="text-sm text-stone-500 flex items-center gap-2 flex-wrap mt-1">
                {product.variants > 1 && (
                  <span className="bg-stone-200 text-stone-700 px-2 py-0.5 rounded-md font-medium text-xs">
                    {product.variants} variants
                  </span>
                )}
                <span>•</span>
                <span>{product.category}</span>
                <StockInfo stock={product.stock} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end md:justify-normal flex-wrap w-full md:w-auto">
            <div className="hidden md:block h-10 border-l border-stone-200 mr-6"></div>

            {/* Contenedor de precios */}
            <div className="flex-1 flex items-center gap-6">
              <div className="min-w-[120px] text-left">
                <span className="text-xs text-stone-500 uppercase">
                  Retail Price
                </span>
                <p className="font-semibold text-stone-800 mt-1">
                  {formatPrice(product.retailPrice)}
                </p>
              </div>
              <div className="min-w-[120px] text-left">
                <span className="text-xs text-stone-500 uppercase">
                  Wholesale Price
                </span>
                <p className="font-semibold text-stone-800 mt-1">
                  {formatPrice(product.wholesalePrice)}
                </p>
              </div>
            </div>

            {/* Menú de Acciones (Dropdown) */}
            <div className="ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors">
                    <MoreHorizontal className="size-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border-stone-200 text-stone-900"
                >
                  <DropdownMenuItem
                    onClick={() => handleEdit(product.id)}
                    className="cursor-pointer focus:bg-stone-100"
                  >
                    <Edit className="size-4 mr-2" />
                    Editar Producto
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(product.id)}
                    className="cursor-pointer !text-red-500 focus:!bg-red-50 focus:!text-red-600"
                  >
                    <Trash2 className="size-4 mr-2" />
                    Eliminar Producto
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { ProductsList as ProductsTable };
