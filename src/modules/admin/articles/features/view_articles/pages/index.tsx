import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { Header } from "../components/header";
import { ArticlesTable } from "../components/articles_table";
import { useGetArticles } from "../service";
import { AsyncBoundary } from "@/components/ui";
import { EmptyState, ErrorState, LoadingState } from "../components";

export default function ViewArticlesPage() {
  const { changeTitle } = useTitle();
  const { data, isLoading, error } = useGetArticles({ page: 1, limit: 10 });

  useEffect(() => {
    changeTitle("Gestionar artículos - La base");
  }, [changeTitle]);

  const articles = data?.data?.data;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Header />

      <AsyncBoundary
        isLoading={isLoading}
        isError={!!error}
        data={articles}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
        EmptyComponent={<EmptyState />}
      >
        {() => <ArticlesTable articles={articles || []} />}
      </AsyncBoundary>
    </div>
  );
}
