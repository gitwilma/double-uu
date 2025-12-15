import { getArticleBySlug } from "@/lib/repositories/articleRepo.mongo";
import { notFound } from "next/navigation";
import { ImageImport } from "@/app/components/common/ImageImport";
import { Page, Inner, Hero, Cover, Head, Title, MetaRow, Body, Section, SectionImage, SectionText } from "./styled";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }
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
            <Title>{article.title}</Title>

            {article.publishedAt ? (
              <MetaRow>
                Publicerad{" "}
                {new Date(article.publishedAt).toLocaleDateString("sv-SE")}
              </MetaRow>
            ) : null}
          </Head>
        </Hero>

       <Body>
        {article.sections.map((section, index) => (
          <Section key={index} $flip={index % 2 === 1}>
            {section.image && (
              <SectionImage>
                <ImageImport
                  src={section.image}
                  alt={section.subtitle}
                  fill
                  className="absolute inset-0 object-cover"
                />
              </SectionImage>
          )}

              <SectionText>
                <h2>{section.subtitle}</h2>
                <p>{section.body}</p>
                </SectionText>
            </Section>
          ))}
      </Body>


      </Inner>
    </Page>
  );
}
