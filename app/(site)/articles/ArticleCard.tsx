import type { Article } from "@/lib/types";
import { ImageImport } from "@/app/components/common/ImageImport";
import {
  CardLink,
  CardShell,
  TitleBlock,
  Title,
  Subtitle,
  DateLabel,
} from "./styled";
import { Media } from "./[slug]/ArticleSectionFeed.styled";

type Props = {
  article: Article;
  side: "left" | "right";
  progress: number;
};

export function ArticleCard({ article, side, progress }: Props) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("sv-SE")
    : null;

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
        {side === "left" ? (
          <>
            {date && (
              <DateLabel $side={side} dateTime={article.publishedAt!}>
                {date}
              </DateLabel>
            )}
            <Title>{article.title}</Title>
            {article.excerpt ? (
              <Subtitle $side={side}>{article.excerpt}</Subtitle>
            ) : null}
          </>
        ) : (
          <>
            {article.excerpt ? (
              <Subtitle $side={side}>{article.excerpt}</Subtitle>
            ) : null}
            <Title>{article.title}</Title>
            {date && (
              <DateLabel $side={side} dateTime={article.publishedAt!}>
                {date}
              </DateLabel>
            )}
          </>
        )}
      </TitleBlock>
    </CardLink>
  );
}
