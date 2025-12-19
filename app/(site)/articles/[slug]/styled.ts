"use client";

import { media } from "@/lib/styles/media";
import { spacing } from "@/lib/styles/spacing";
import { typography } from "@/lib/styles/typography";
import styled from "styled-components";

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
  padding: 110px 20px 80px;
`;

export const Hero = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  align-items: start;

  ${media.mobile} {
    justify-items: center;
  }

  @media (min-width: 900px) {
    grid-template-columns: 520px 1fr;
    gap: 40px;
    align-items: start;
    justify-items: stretch;
  }
`;

export const Cover = styled.figure`
  margin: 0;
  width: 100%;
  max-width: 520px;
  aspect-ratio: 3 / 4;
  overflow: hidden;

  box-shadow: 0 32px 70px -26px rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;

  ${media.mobile} {
    width: calc(100% - ${spacing.md} * 2);
  }
`;

export const Head = styled.div`
  color: #111;
  align-self: start;

  ${media.mobile} {
    width: calc(100% - ${spacing.md} * 2);
  }
`;


export const Title = styled.h1`
font-family: var(--font-title);
font-weight: 400;
  margin: 0;
  letter-spacing: -0.03em;
  line-height: 0.95;
  font-size: clamp(44px, 6.5vw, 82px);
`;

export const MetaRow = styled.p`
  margin: 12px 0 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.72);
`;

export const Body = styled.article`
  margin-top: 38px;
`;

export const Excerpt = styled.p`
  margin: 12px 0 0;
  font-family: ${typography.body.family};
  line-height: ${typography.body.lineHeight};
  color: rgba(0, 0, 0, 0.82);
  max-width: 60ch;

  ${media.mobile} {
    margin-top: 10px;
  }
`;
