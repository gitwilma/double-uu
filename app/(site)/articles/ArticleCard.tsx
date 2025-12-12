import type { Article } from "@/lib/types";
import { ImageImport } from "@/app/components/common/ImageImport";
import {
  CardLink,
  CardShell,
  Media,
  Overlay,
  TitleBlock,
  Title,
  Subtitle,
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
          <Overlay />
        </Media>
      </CardShell>
      
      <TitleBlock $side={side} $progress={progress}>
        {side === "right" ? (
          <>
            {article.excerpt ? <Subtitle>{article.excerpt}</Subtitle> : null}
            <Title>{article.title}</Title>
          </>
        ) : (
          <>
            <Title>{article.title}</Title>
            {article.excerpt ? <Subtitle>{article.excerpt}</Subtitle> : null}
          </>
        )}
      </TitleBlock>
    </CardLink>
  );
}
