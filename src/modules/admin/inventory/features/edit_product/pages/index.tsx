import { useTitle } from "@/hooks";
import type { ProductFormData } from "../types";
import { useEffect } from "react";
import { CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { ProductForm } from "../../create_product/components/product_form";

export default function EditProduct() {
  const { changeTitle } = useTitle();
  // const navigate = useNavigate();
  // const { mutate: createProduct, isPending } = useCreateProduct();

  useEffect(() => {
    changeTitle("Editar Producto - La base");
  }, [changeTitle]);

  const handleSubmit = (data: ProductFormData) => {
    console.log("Form Data Submitted:", data);
    // Aquí iría la lógica de `createProduct(formData, { ... })`
    alert("Formulario enviado. Revisa la consola para ver los datos.");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader title="Editar Producto" to={ROUTES.Admin.ViewInventory} />

      <ProductForm onSubmit={handleSubmit} isSubmitting={false} />
    </div>
  );
}
