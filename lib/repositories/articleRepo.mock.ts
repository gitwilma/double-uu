import { mockArticles } from "../mock-data";
import type { Article } from "../types";

export async function getPublishedArticles(): Promise<Article[]> {
  return mockArticles.filter((a) => a.status === "published");
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  return mockArticles.find((a) => a.slug === slug) ?? null;
}
