import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArticleForm } from "../../create_article/components/article_form";
import { mockArticles } from "../../view_articles/constants/mock-data";
import { ROUTES } from "@/routes/routes";

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { changeTitle } = useTitle();

  const articleToEdit = mockArticles.find((article) => article.id === id);

  useEffect(() => {
    const title = articleToEdit
      ? `Editando: ${articleToEdit.title}`
      : "Editar Artículo";
    changeTitle(`${title} - La base`);
  }, [changeTitle, articleToEdit]);

  if (!articleToEdit) {
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
      <ArticleForm />
    </div>
  );
}
