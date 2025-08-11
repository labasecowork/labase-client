import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { Header } from "../components/header";
import { ArticlesTable } from "../components/articles_table";
import { useGetArticles } from "../service";

export default function ViewArticlesPage() {
  const { changeTitle } = useTitle();
  const { data, isLoading, error } = useGetArticles({ page: 1, limit: 10 });

  useEffect(() => {
    changeTitle("Gestionar artículos - La base");
  }, [changeTitle]);

  const articles = data?.data?.data;
  console.log("Articles data structure:", {
    fullData: data,
    articles: articles,
  });
  const hasArticles = articles && articles.length > 0;
  const isEmpty = articles && articles.length === 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Header />
      {isLoading && <p className="text-center py-4">Cargando artículos...</p>}
      {error && (
        <p className="text-red-500 text-center py-4">
          Error al cargar los artículos: {error.message}
        </p>
      )}
      {!isLoading && !error && isEmpty && (
        <p className="text-center py-10 text-gray-500">
          No hay artículos disponibles
        </p>
      )}
      {!isLoading && !error && hasArticles && (
        <ArticlesTable articles={articles} />
      )}
    </div>
  );
}
