import { getArticleBySlug } from "@/lib/repositories/articleRepo.mongo";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article || article.status !== "published") {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{article.title}</h1>
      {article.publishedAt && (
        <p className="mt-2 text-xs text-neutral-400">
          Publicerad {new Date(article.publishedAt).toLocaleDateString("sv-SE")}
        </p>
      )}
      <article className="prose prose-invert mt-6 max-w-none">
        <p>{article.content}</p>
      </article>
    </main>
  );
}
