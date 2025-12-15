"use client";

import Image from "next/image";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { Section, Media, Text } from "./ArticleSection.styled";

type Props = {
  image: string;
  heading: string;
  text: string;
  reverse?: boolean;
};

export function ArticleSection({ image, heading, text, reverse }: Props) {
  const { ref, progress } = useScrollProgress();

  return (
    <Section ref={ref} $reverse={reverse}>
      <Media $progress={progress}>
        <Image src={image} alt={heading} fill />
      </Media>

      <Text $progress={progress} $reverse={reverse}>
        <h3>{heading}</h3>
        <p>{text}</p>
      </Text>
    </Section>
  );
}
