import { getPublishedArticles } from "@/lib/repositories/articleRepo.mock";
import { ArticleCard } from "./ArticleCard";

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="mx-auto flex min-h-screen flex-col gap-8 px-4 py-10 bg-[#23062E]">
      <h1 className="text-2xl font-semibold text-white">Artiklar</h1>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
    </main>
  );
}
