import type { Article } from "@/lib/types";
import { ImageImport } from "@/app/components/common/ImageImport";
import { CardLink, CardShell, Media, Overlay, Meta } from "./styled";

type Props = {
  article: Article;
  side: "left" | "right";
  progress: number;
};

export function ArticleCard({ article, side, progress }: Props) {
  return (
    <CardLink href={`/articles/${article.slug}`}>
      <CardShell $side={side} $progress={progress} aria-label={article.title}>
        <Media>
          {article.coverImage && (
            <ImageImport
              src={article.coverImage}
              alt={article.title}
              fill
              className="absolute inset-0 object-cover"
            />
          )}
          <Overlay />
        </Media>

        <Meta>
          <h2>{article.title}</h2>
          {article.excerpt ? <p>{article.excerpt}</p> : null}
        </Meta>
      </CardShell>
    </CardLink>
  );
}
