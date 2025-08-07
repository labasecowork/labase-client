import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { ArticleForm } from "../components/article_form";
import { ROUTES } from "@/routes/routes";
export default function CreateArticlePage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Crear artículo - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader
        title="Crear Nuevo Artículo"
        to={ROUTES.Admin.ViewArticles}
      />
      <ArticleForm />
    </div>
  );
}
