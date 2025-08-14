import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArticleForm } from "@/modules/admin/articles/shared/components/article_form";
import { ROUTES } from "@/routes/routes";
import { useGetArticle } from "../../view_articles/service";
import { useUpdateArticle } from "../service";
import { toast } from "sonner";

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { changeTitle } = useTitle();
  const navigate = useNavigate();

  const { data: article, isLoading, error } = useGetArticle(id || "");
  const { mutate: updateArticle, isPending: isUpdating } = useUpdateArticle(
    id || "",
  );

  useEffect(() => {
    changeTitle(`Editar artículo - La base`);
  }, [changeTitle]);

  const handleSubmit = (formData: FormData) => {
    updateArticle(formData, {
      onSuccess: (response) => {
        toast.success("Artículo actualizado exitosamente", {
          description: `El artículo "${response.title || "actualizado"}" ha sido guardado.`,
        });
        navigate(ROUTES.Admin.ViewArticles);
      },
      onError: (error: Error) => {
        toast.error("Error al actualizar el artículo", {
          description: error.message,
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <CustomHeader title="Editar Artículo" to={ROUTES.Admin.ViewArticles} />
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <CustomHeader
          title="Artículo no encontrado"
          to={ROUTES.Admin.ViewArticles}
        />
        <p className="mt-8 text-center text-stone-600">
          No se pudo encontrar el artículo que intentas editar. Por favor,
          vuelve a la lista e inténtalo de nuevo.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader title="Editar Artículo" to={ROUTES.Admin.ViewArticles} />
      <ArticleForm
        defaultValues={{
          title: article.title,
          categoryId: article.category_id,
          content: article.content || "",
        }}
        defaultBannerUrl={article.banner}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        submitLabel="Guardar cambios"
        submittingLabel="Guardando cambios..."
        title="Editar Artículo"
        description="Modifica la información del artículo y guarda los cambios."
      />
    </div>
  );
}
