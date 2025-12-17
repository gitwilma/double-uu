import { getArticleBySlug } from "@/lib/repositories/articleRepo.mongo";
import { notFound } from "next/navigation";
import { ImageImport } from "@/app/components/common/ImageImport";
import ArticleSectionsFeed from "./ArticleSectionFeed";
import { Page, Inner, Hero, Cover, Head, Title, MetaRow, Body, Excerpt } from "./styled";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <Page>
      <Inner>
        <Hero>
          {article.coverImage ? (
            <Cover>
              <ImageImport
                src={article.coverImage}
                alt={article.title}
                fill
                className="absolute inset-0 object-cover"
                priority
              />
            </Cover>
          ) : null}

              <Head>
            {article.publishedAt ? (
              <MetaRow>
                Publicerad{" "}
                {new Date(article.publishedAt).toLocaleDateString("sv-SE")}
              </MetaRow>
            ) : null}

            <Title>{article.title}</Title>

            {article.excerpt ? <Excerpt>{article.excerpt}</Excerpt> : null}
          </Head>
        </Hero>

        <Body>
          <ArticleSectionsFeed sections={article.sections} />
        </Body>
      </Inner>
    </Page>
  );
}
