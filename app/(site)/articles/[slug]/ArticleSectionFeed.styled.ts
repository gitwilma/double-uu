"use client";

import styled, { css } from "styled-components";
import { media } from "@/lib/styles/media";
import { spacing } from "@/lib/styles/spacing";
import { typography } from "@/lib/styles/typography";

export const Feed = styled.section`
  margin-top: ${spacing.xl};
  display: grid;
  gap: 120px;

  ${media.tablet} {
    gap: ${spacing.xxl};
  }

  ${media.mobile} {
    gap: ${spacing.xl};
  }
`;

export const Viewport = styled.section`
  min-height: 100vh;
  position: relative;

  ${media.tablet} {
    min-height: auto;
  }

  ${media.mobile} {
    min-height: auto;
  }
`;

export const ViewportInner = styled.div`
  position: relative;
  height: 100%;
  --cardW: 520px;
  --cardH: min(640px, calc(100vh - 220px));
  --edge: 18px;
  --gap: 22px;

  ${media.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "media text";
    column-gap: 32px;
    align-items: start;
  }

  ${media.mobile} {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      "media"
      "text";
    gap: ${spacing.md};
  }
`;

export const CardShell = styled.article<{
  $side: "left" | "right";
  $progress: number;
}>`
  position: absolute;
  top: 12vh;
  z-index: 2;

  width: 100%;
  max-width: 520px;
  aspect-ratio: 3 / 4;
  overflow: hidden;

  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 32px 70px -26px rgba(0, 0, 0, 0.55);

  ${({ $side }) =>
    $side === "left" ? css`left: var(--edge);` : css`right: var(--edge);`}

  ${({ $side, $progress }) => {
    const p = Math.max(0, Math.min(1, $progress));
    const startOffset = 580;
    const x = ($side === "left" ? -1 : 1) * (1 - p) * startOffset;

    return css`
      transform: translate3d(${x}px, 0, 0);
      transition: transform 0.05s linear;
    `;
  }}

  ${media.tablet} {
    position: relative;
    inset: auto;
    transform: none;

    grid-area: media;
    width: 100%;
    height: var(--cardH);
  }

 ${media.mobile} {
  position: relative;
  inset: auto;
  transform: none;

  width: calc(100% - ${spacing.md} * 2);
  margin: 0 auto;

  height: auto;
}
`;

export const Media = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  ${media.mobile} {
    height: 100%;
  aspect-ratio: auto;
  }
`;

export const TextPanel = styled.aside<{
  $side: "left" | "right";
  $progress: number;
}>`
  position: absolute;
  top: 12vh;
  z-index: 3;

  width: var(--cardW);
  height: var(--cardH);

  overflow: auto;
  padding: ${spacing.md};


  ${({ $side }) =>
    $side === "left"
      ? css`
          left: calc(var(--edge) + var(--cardW) + var(--gap));
          text-align: left;
        `
      : css`
          right: calc(var(--edge) + var(--cardW) + var(--gap));
          text-align: right;
        `}

  ${({ $progress }) => {
    const p = Math.max(0, Math.min(1, $progress));
    const ramp = Math.max(0, Math.min(1, (p - 0.18) / 0.82));
    return css`
      opacity: ${ramp};
    `;
  }}

  ${media.tablet} {
    position: relative;
    inset: auto;

    grid-area: text;
    width: 100%;
    height: var(--cardH);

    opacity: 1;
    transition: none;
    text-align: left;
  }

 ${media.mobile} {
  position: relative;
  inset: auto;
  opacity: 1;

  width: calc(100% - ${spacing.md} * 2);
  margin: 0 auto;

  height: auto;
  overflow: visible;

  text-align: left;
}

`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-family: ${typography.title.family};
  font-weight: ${typography.title.weight};
  font-size: 28px;
  line-height: 1.1;
`;

export const SectionBody = styled.p`
  margin-top: ${spacing.sm};
  font-family: ${typography.body.family};
  line-height: ${typography.body.lineHeight};
  color: rgba(0, 0, 0, 0.86);
`;
