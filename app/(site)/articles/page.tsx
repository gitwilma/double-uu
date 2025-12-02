import { getPublishedArticles } from "@/lib/repositories/articleRepo.mongo";
import { ArticleCard } from "./ArticleCard";

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="mx-auto flex min-h-screen flex-col gap-8 px-4 py-10">

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
    </main>
  );
}
