import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl border border-white/10">
        <div className="relative aspect-[3/4] w-full">
          {article.coverImage && (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/60 transition-colors duration-300 group-hover:bg-black/0" />
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4">
            <h2 className="text-lg font-semibold text-white">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="mt-2 text-sm text-neutral-200">
                {article.excerpt}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
