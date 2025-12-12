import { getPublishedArticles } from "@/lib/repositories/articleRepo.mongo";
import ArticlesFeed from "./ArticlesFeed";


export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return <ArticlesFeed articles={articles} />;
}
