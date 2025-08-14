import { CustomHeader, Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { useParams, useNavigate } from "react-router-dom";
import { useGetArticle } from "@/modules/admin/articles/features/view_articles/service";
import { useDeleteArticle } from "@/modules/admin/articles/features/edit_article/service";
import { toast } from "sonner";

export const DeleteArticlePage = () => {
  const { changeTitle } = useTitle();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: article, isLoading } = useGetArticle(id || "");
  const { mutate: deleteArticle } = useDeleteArticle();

  useEffect(() => {
    changeTitle("Eliminar artículo - La base");
  }, [changeTitle]);

  const handleDelete = () => {
    setIsDeleting(true);
    deleteArticle(id || "", {
      onSuccess: () => {
        toast.success("Artículo eliminado", {
          description: `El artículo "${article?.title}" ha sido eliminado correctamente.`,
        });
        navigate(ROUTES.Admin.ViewArticles);
      },
      onError: (error: Error) => {
        setIsDeleting(false);
        toast.error("Error al eliminar el artículo", {
          description: error.message,
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <CustomHeader title="Eliminar Artículo" to={ROUTES.Admin.ViewArticles} />
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <CustomHeader title="Eliminar Artículo" to={ROUTES.Admin.ViewArticles} />
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">No se pudo encontrar el artículo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader title="Eliminar Artículo" to={ROUTES.Admin.ViewArticles} />
      <Card className="mt-8 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700">Confirmar eliminación</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 mb-4">
            ¿Estás seguro de que deseas eliminar el artículo "{article.title}"? Esta acción no se puede deshacer.
          </p>
          <div className="bg-white p-4 rounded-md border border-red-100 mt-4">
            <h3 className="font-medium mb-2">Detalles del artículo:</h3>
            <p><strong>Título:</strong> {article.title}</p>
            {article.articleCategory && (
              <p><strong>Categoría:</strong> {article.articleCategory.name}</p>
            )}
            {article.publication_timestamp && (
              <p><strong>Fecha de publicación:</strong> {new Date(article.publication_timestamp).toLocaleDateString()}</p>
            )}
            <div className="mt-4">
              {article.banner && (
                <img
                  src={article.banner}
                  alt={article.title}
                  className="w-full max-w-md h-auto rounded-md border border-gray-200"
                />
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(ROUTES.Admin.ViewArticles)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar artículo"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteArticlePage;
