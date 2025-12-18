import { ImageImport } from "@/app/components/common/ImageImport";
import type { ArticleSection } from "@/lib/types";

import {
  Page,
  Inner,
  Hero,
  Cover,
  Head,
  Title,
  MetaRow,
  Body,
  Section,
  SectionImage,
  SectionText,
} from "./AboutContent.styled";

type Props = {
  title: string;
  publishedAt?: string;
  coverImage?: string;
  sections: ArticleSection[];
};

export function AboutContent({ title, publishedAt, coverImage, sections }: Props) {
  return (
    <Page>
      <Inner>
        <Hero>
          {coverImage && (
            <Cover>
              <ImageImport
                src={coverImage}
                alt={title}
                fill
                className="absolute inset-0 object-cover"
                priority
              />
            </Cover>
          )}

          <Head>
            <Title>{title}</Title>
            {publishedAt && (
              <MetaRow>{new Date(publishedAt).toLocaleDateString("sv-SE")}</MetaRow>
            )}
          </Head>
        </Hero>

        <Body>
          {sections.map((section, index) => (
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
