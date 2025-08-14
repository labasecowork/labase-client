import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { ROUTES } from "@/routes/routes";
import { useParams, useNavigate } from "react-router-dom";
import { CategoryForm } from "@/modules/admin/categories/shared/components/category_form";
import { useGetCategory } from "@/modules/admin/categories/features/view_categories/service";
import { useUpdateCategory } from "../service";
import type { CategoryFormData } from "@/modules/admin/categories/shared/components/category_form";
import { toast } from "sonner";

export const EditCategoryPage = () => {
  const { changeTitle } = useTitle();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading: isLoadingCategory } = useGetCategory(
    id || "",
  );
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory(
    id || "",
  );

  useEffect(() => {
    changeTitle("Editar categoría - La base");
  }, [changeTitle]);

  const handleSubmit = (data: CategoryFormData) => {
    updateCategory(
      {
        name: data.name,
        description: data.description,
      },
      {
        onSuccess: () => {
          toast.success("Categoría actualizada exitosamente", {
            description: `La categoría "${data.name}" ha sido actualizada.`,
          });
          navigate(ROUTES.Admin.ViewCategories);
        },
        onError: (error: Error) => {
          toast.error("Error al actualizar la categoría", {
            description: error.message,
          });
        },
      },
    );
  };

  if (isLoadingCategory) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <CustomHeader
          title="Editar Categoría"
          to={ROUTES.Admin.ViewCategories}
        />
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando categoría...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <CustomHeader
          title="Editar Categoría"
          to={ROUTES.Admin.ViewCategories}
        />
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">No se pudo encontrar la categoría.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader title="Editar Categoría" to={ROUTES.Admin.ViewCategories} />
      <CategoryForm
        defaultValues={{
          name: category.name,
          description: category.description,
        }}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        submitLabel="Guardar cambios"
        submittingLabel="Guardando cambios..."
        title="Editar Categoría"
        description="Modifica el nombre y la descripción de la categoría."
      />
    </div>
  );
};

export default EditCategoryPage;
