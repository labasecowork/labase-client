export type ArticleStatus = "accepted" | "draft" | "rejected";

export interface Author {
  first_name: string;
  last_name: string;
}

export interface ArticleCategory {
  name: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  banner: string;
  resume: string;
  reading_time: number;
  publication_timestamp: string;
  status: ArticleStatus;
  author: Author;
  author_id: string;
  category_id: string;
  articleCategory: ArticleCategory;
}

export interface ArticlesData {
  data: Article[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface ArticlesResponse {
  data: ArticlesData;
}

export interface GetArticlesParams {
  page?: number;
  limit?: number;
}
