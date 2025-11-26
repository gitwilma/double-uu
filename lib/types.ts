export type ArticleStatus = "draft" | "published";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  status: ArticleStatus;
  publishedAt?: string;
  authorId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
  confirmed: boolean;
  unsubscribed: boolean;
}
