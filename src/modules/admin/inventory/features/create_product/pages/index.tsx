import { useTitle } from "@/hooks";
import type { ProductFormData } from "../types";
import { useEffect } from "react";
import { ProductForm } from "../components/product_form";
import { CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";

export default function CreateProductPage() {
  const { changeTitle } = useTitle();
  // const navigate = useNavigate();
  // const { mutate: createProduct, isPending } = useCreateProduct();

  useEffect(() => {
    changeTitle("Crear Nuevo Producto - La base");
  }, [changeTitle]);

  const handleSubmit = (data: ProductFormData) => {
    console.log("Form Data Submitted:", data);
    // Aquí iría la lógica de `createProduct(formData, { ... })`
    alert("Formulario enviado. Revisa la consola para ver los datos.");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader
        title="Crear Nuevo Producto"
        to={ROUTES.Admin.ViewInventory}
      />

      <ProductForm onSubmit={handleSubmit} isSubmitting={false} />
    </div>
  );
}
