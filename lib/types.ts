export type ArticleSection = {
  image?: string;
  subtitle: string;
  body: string;
};

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  publishedAt?: string;
  authorId: string;

  sections: ArticleSection[];
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
