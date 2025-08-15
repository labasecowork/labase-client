import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import type { Product } from "../../types";

// Función para formatear el precio, sin cambios
const formatPrice = (price: number | [number, number]) => {
  if (Array.isArray(price)) {
    return `$${price[0].toFixed(2)} - $${price[1].toFixed(2)}`;
  }
  return `$${price.toFixed(2)}`;
};

// Pequeño componente para mostrar el estado del stock con color y texto
const StockStatus: React.FC<{ stock: number }> = ({ stock }) => {
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
    <div className="flex justify-between items-center mt-1">
      <span className="text-xs text-stone-500">Stock</span>
      <span className={`font-semibold text-sm ${color}`}>
        {text} ({stock} units)
      </span>
    </div>
  );
};

export const ProductsGrid: React.FC<{ products: Product[] }> = ({
  products,
}) => {
  const navigate = useNavigate();

  // Funciones para manejar las acciones del menú contextual
  const handleEdit = (productId: string) => {
    console.log("Edit product:", productId);
    // const editUrl = ROUTES.Admin.EditProduct.replace(":id", productId);
    // navigate(editUrl);
  };

  const handleDelete = (productId: string) => {
    console.log("Delete product:", productId);
    // const deleteUrl = ROUTES.Admin.DeleteProduct.replace(":id", productId);
    // navigate(deleteUrl);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {products.map((product) => (
        // Envolvemos cada tarjeta con el ContextMenu
        <ContextMenu key={product.id}>
          <ContextMenuTrigger>
            <div className="bg-white rounded-lg overflow-hidden border border-stone-200 transition-all cursor-context-menu hover:shadow-lg hover:border-stone-300">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover bg-stone-100"
              />
              <div className="p-4">
                <h3
                  className="font-semibold text-stone-900 truncate"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-stone-500">{product.category}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-stone-500">Retail Price</span>
                  <span className="font-semibold text-stone-800">
                    {formatPrice(product.retailPrice)}
                  </span>
                </div>
                {/* Usamos el componente StockStatus para la consistencia */}
                <StockStatus stock={product.stock} />
              </div>
            </div>
          </ContextMenuTrigger>
          {/* El contenido del menú es el mismo que en la tabla */}
          <ContextMenuContent>
            <ContextMenuItem
              className="cursor-pointer"
              onClick={() => handleEdit(product.id)}
            >
              <Edit className="size-4 mr-2" />
              Editar Producto
            </ContextMenuItem>
            <ContextMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={() => handleDelete(product.id)}
            >
              <Trash2 className="size-4 mr-2" />
              Eliminar Producto
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  );
};
