import type { Article } from "@/lib/types";
import { ImageImport } from "@/app/components/common/ImageImport";
import {
  CardLink,
  CardShell,
  Media,
  TitleBlock,
  Title,
  Subtitle,
  DateLabel,
} from "./styled";

type Props = {
  article: Article;
  side: "left" | "right";
  progress: number;
};

export function ArticleCard({ article, side, progress }: Props) {
  return (
    <CardLink href={`/articles/${article.slug}`}>
      <CardShell $side={side} $progress={progress}>
        <Media>
          {article.coverImage && (
            <ImageImport
              src={article.coverImage}
              alt={article.title}
              fill
              className="absolute inset-0 object-cover"
            />
          )}
        </Media>
      </CardShell>

      <TitleBlock $side={side} $progress={progress}>
  {article.publishedAt && (
    <DateLabel dateTime={article.publishedAt}>
      {new Date(article.publishedAt).toLocaleDateString("sv-SE")}
    </DateLabel>
  )}

  <Title>{article.title}</Title>

  {article.excerpt ? <Subtitle>{article.excerpt}</Subtitle> : null}
</TitleBlock>
    </CardLink>
  );
}
