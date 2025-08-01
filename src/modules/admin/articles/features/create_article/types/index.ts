import type { Article } from "../../view_articles/types";
export type ArticleFormData = Omit<Article, "id" | "publicationDate">;
