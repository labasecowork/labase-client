import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { CategoryForm } from "@/modules/admin/articles_categories/shared/components/category_form";
import { useCreateCategory } from "../service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { CategoryFormData } from "@/modules/admin/articles_categories/shared/components/category_form";
import { ROUTES } from "@/routes/routes";

export const CreateCategoryPage = () => {
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const { mutate: createCategory, isPending } = useCreateCategory();

  useEffect(() => {
    changeTitle("Crear categoría - La base");
  }, [changeTitle]);

  const handleSubmit = (data: CategoryFormData) => {
    createCategory(
      {
        name: data.name,
        description: data.description,
      },
      {
        onSuccess: (response) => {
          toast.success("Categoría creada exitosamente", {
            description: `La categoría "${
              response?.category?.name || "Nueva"
            }" ha sido creada.`,
          });
          navigate(ROUTES.Admin.ViewCategoriesArticles);
        },
        onError: (error: Error) => {
          toast.error("Error al crear la categoría", {
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader
        title="Crear Nueva Categoría"
        to={ROUTES.Admin.ViewCategoriesArticles}
      />
      <CategoryForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitLabel="Crear categoría"
        submittingLabel="Creando categoría..."
        title="Información de la Categoría"
        description="Ingresa el nombre y la descripción de la categoría."
      />
    </div>
  );
};

export default CreateCategoryPage;
