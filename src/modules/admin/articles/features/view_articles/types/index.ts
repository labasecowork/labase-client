export type ArticleStatus = "published" | "draft";

export interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
  status: ArticleStatus;
  publicationDate: string; 
}