import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { Header } from "../components/header";
import { ArticlesTable } from "../components/articles_table";
import { mockArticles } from "../constants/mock-data";

export default function ViewArticlesPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Gestionar Artículos - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Header />
      <ArticlesTable articles={mockArticles} />
    </div>
  );
}
