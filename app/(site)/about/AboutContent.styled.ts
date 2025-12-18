"use client";

import styled, { css } from "styled-components";
import { media } from "@/lib/styles/media";
import { spacing } from "@/lib/styles/spacing";
import { typography } from "@/lib/styles/typography";

export const Page = styled.main`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

export const Inner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1080px;
  margin: 0 auto;

  padding: 110px ${spacing.md} 80px;

  ${media.tablet} {
    padding: 96px ${spacing.md} 72px;
  }

  ${media.mobile} {
    padding: 80px ${spacing.md} 64px;
  }

  ${media.wide} {
    max-width: 1200px;
  }
`;

export const Hero = styled.header`
  display: grid;
  grid-template-columns: 520px 1fr;
  gap: ${spacing.xl};
  align-items: start;

  ${media.tablet} {
    grid-template-columns: minmax(320px, 460px) 1fr;
    gap: ${spacing.lg};
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${spacing.md};
  }
`;

export const Cover = styled.figure`
  margin: 0;
  width: 100%;
  max-width: 520px;
  aspect-ratio: 3 / 4;
  border-radius: 24px;
  overflow: hidden;

  box-shadow: 0 32px 70px -26px rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.18);

  position: relative;

  ${media.tablet} {
    max-width: none;
  }

  ${media.mobile} {
    max-width: none;
    width: 100%;
  }
`;

export const Head = styled.div`
  color: #111;
  align-self: start;
`;

export const Title = styled.h1`
  margin: 0;

  font-family: ${typography.title.family};
  font-weight: ${typography.title.weight};
  letter-spacing: ${typography.title.tracking};
  line-height: 0.95;

  font-size: clamp(44px, 6.5vw, 82px);

  ${media.tablet} {
    font-size: clamp(38px, 5vw, 64px);
  }

  ${media.mobile} {
    font-size: clamp(34px, 9vw, 48px);
    letter-spacing: -0.02em;
  }
`;

export const MetaRow = styled.p`
  margin-top: ${spacing.sm};

  font-family: ${typography.body.family};
  font-size: ${typography.meta.size};
  letter-spacing: ${typography.meta.tracking};
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.7);
`;

export const Body = styled.article`
  margin-top: ${spacing.xl};

  ${media.mobile} {
    margin-top: ${spacing.lg};
  }
`;

export const Section = styled.section<{ $flip: boolean }>`
  display: grid;
  gap: ${spacing.lg};
  margin: ${spacing.xxl} 0;

  grid-template-columns: 1fr 1fr;
  align-items: start;

  ${({ $flip }) =>
    $flip &&
    css`
      direction: rtl;

      & > * {
        direction: ltr;
      }
    `}

  ${media.mobile} {
    grid-template-columns: 1fr;
    margin: ${spacing.xl} 0;
  }
`;

export const SectionImage = styled.figure`
  margin: 0;
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 24px;
  overflow: hidden;

  box-shadow: 0 32px 70px -26px rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const SectionText = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: auto;

  padding: ${spacing.lg};
  border-radius: 24px;

  position: relative;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  scrollbar-gutter: stable both-edges;

  ${media.tablet} {
    padding: ${spacing.md};
  }

  ${media.mobile} {
    aspect-ratio: auto;
    overflow: visible;
    padding: 0;
    background: transparent;
    border: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  h2 {
    margin: 0 0 ${spacing.sm};

    font-family: ${typography.title.family};
    font-weight: ${typography.title.weight};
    letter-spacing: -0.02em;
    font-size: 28px;
    line-height: 1.1;
  }

  p {
    margin: 0;
    font-family: ${typography.body.family};
    font-size: 17px;
    line-height: ${typography.body.lineHeight};
  }
`;
