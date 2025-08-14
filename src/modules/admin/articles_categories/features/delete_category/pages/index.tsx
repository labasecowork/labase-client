import {
  CustomHeader,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCategory } from "@/modules/admin/articles_categories/features/view_categories/service";
import { useDeleteCategory } from "@/modules/admin/articles_categories/features/edit_category/service";
import { toast } from "sonner";

export const DeleteCategoryPage = () => {
  const { changeTitle } = useTitle();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: category, isLoading } = useGetCategory(id || "");
  const { mutate: deleteCategory } = useDeleteCategory();

  useEffect(() => {
    changeTitle("Eliminar categoría - La base");
  }, [changeTitle]);

  const handleDelete = () => {
    setIsDeleting(true);
    deleteCategory(id || "", {
      onSuccess: () => {
        toast.success("Categoría eliminada", {
          description: `La categoría "${category?.name}" ha sido eliminada correctamente.`,
        });
        navigate(ROUTES.Admin.ViewCategoriesArticles);
      },
      onError: (error: Error) => {
        setIsDeleting(false);
        toast.error("Error al eliminar la categoría", {
          description: error.message,
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <CustomHeader
          title="Eliminar Categoría"
          to={ROUTES.Admin.ViewCategoriesArticles}
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
          title="Eliminar Categoría"
          to={ROUTES.Admin.ViewCategoriesArticles}
        />
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">No se pudo encontrar la categoría.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader
        title="Eliminar Categoría"
        to={ROUTES.Admin.ViewCategoriesArticles}
      />
      <Card className="mt-8 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700">Confirmar eliminación</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 mb-4">
            ¿Estás seguro de que deseas eliminar la categoría "{category.name}"?
            Esta acción no se puede deshacer.
          </p>
          <div className="bg-white p-4 rounded-md border border-red-100 mt-4">
            <h3 className="font-medium mb-2">Detalles de la categoría:</h3>
            <p>
              <strong>Nombre:</strong> {category.name}
            </p>
            <p>
              <strong>Descripción:</strong> {category.description}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(ROUTES.Admin.ViewCategoriesArticles)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar categoría"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteCategoryPage;
