import styled, { css } from "styled-components";
import Link from "next/link";
import { media } from "@/lib/styles/media";
import { spacing } from "@/lib/styles/spacing";
import { typography } from "@/lib/styles/typography";

export const Page = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

export const Spacer = styled.div`
  height: ${spacing.sm};
`;

export const Viewport = styled.section`
  position: relative;
  height: 100vh;

  ${media.tablet} {
    height: auto;
    padding: ${spacing.xl} 0;
  }

 ${media.mobile} {
    height: auto;
    padding: ${spacing.xl} 0;
  }
`;

export const ViewportInner = styled.div`
  position: relative;
  height: 100%;

  --cardW: min(450px, calc(100vw - 40px));
  --cardH: min(515px, calc(100vh - 120px));
  --edge: 40px;
  --gap: 28px;

  ${media.tablet} {
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.lg};
    padding: 0 ${spacing.md};

    --cardW: 100%;
    --cardH: auto;
    --edge: 0px;
    --gap: 0px;
  }

  ${media.mobile} {
    height: auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: ${spacing.xxl};
    padding: 0 ${spacing.md};

    --cardW: 100%;
    --cardH: auto;
    --edge: 0px;
    --gap: 0px;
  }
`;

export const CardLink = styled(Link)`
  display: contents;

 ${media.tablet} {
  ${({ href }) =>
    typeof href === "string" &&
    css`
      &:nth-of-type(even) {
        direction: rtl;

        > * {
          direction: ltr;
        }
      }
    `}
}

   ${media.mobile} {
    display: block;
  }
`;

export const CardShell = styled.article<{
  $side: "left" | "right";
  $progress: number;
}>`
  position: absolute;
  z-index: 2;
  top: 50%;
  width: var(--cardW);
  height: var(--cardH);
  overflow: hidden;
  box-shadow: 0 60px 40px -18px rgba(0, 0, 0, 0.45);

  ${({ $side }) =>
    $side === "left"
      ? css`left: var(--edge);`
      : css`right: var(--edge);`}

  ${({ $side, $progress }) => {
    const p = Math.max(0, Math.min(1, $progress));
    const startOffset = 760;
    const x = ($side === "left" ? -1 : 1) * (1 - p) * startOffset;
    const y = -50;

    return css`
      transform: translate3d(${x}px, ${y}%, 0);
      transition: transform 0.05s linear;
    `;
  }}

  ${media.tablet} {
  position: relative;
  top: auto;
  left: auto;
  right: auto;
  transform: none;

  width: 100%;
  height: auto;
}

    ${media.mobile} {
  position: relative;
  top: auto;
  left: auto;
  right: auto;

  transform: none;

  width: 100%;
  height: auto;

  margin: 0;
}
`;

export const TitleBlock = styled.div<{
  $side: "left" | "right";
  $progress: number;
}>`
  position: absolute;
  z-index: 5;
  max-width: 420px;

  ${({ $side }) =>
    $side === "left"
      ? css`
          left: calc(var(--edge) + var(--cardW) + var(--gap));
          top: 18vh;
          text-align: left;
        `
      : css`
          right: calc(var(--edge) + var(--cardW) + var(--gap));
          bottom: 16vh;
          text-align: right;
        `}

  ${({ $progress }) => {
    const p = Math.max(0, Math.min(1, $progress));
    const delay = 0.25;
    const ramp = Math.max(0, Math.min(1, (p - delay) / (1 - delay)));

    return css`
      opacity: ${ramp};
      transition: opacity 1s linear;
      will-change: opacity;
    `;
  }}

  ${media.tablet} {
    position: relative;
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;

    margin-top: ${spacing.md};
    max-width: 100%;
    text-align: left;

    opacity: 1;
    transition: none;
  }

  ${media.mobile} {
  position: relative;
  left: auto;
  right: auto;
  top: auto;
  bottom: auto;

  margin-top: ${spacing.md};
  max-width: 100%;
  width: 100%;

  text-align: left;
  opacity: 1;
}
`;

export const DateLabel = styled.time`
  display: block;
  margin-bottom: 6px;

  font-family: ${typography.body.family};
  font-size: ${typography.meta.size};
  letter-spacing: ${typography.meta.tracking};
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.55);
`;

export const Title = styled.h2`
  margin: 0;

  font-family: ${typography.title.family};
  font-weight: ${typography.title.weight};
  letter-spacing: ${typography.title.tracking};

  font-size: clamp(42px, 6vw, 64px);
  line-height: 0.95;
  color: #000;
`;

export const Subtitle = styled.p`
  margin-top: ${spacing.xs};
  font-family: ${typography.body.family};
  line-height: ${typography.body.lineHeight};
  color: rgba(0, 0, 0, 0.85);
`;

export const Media = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  ${media.tablet} {
    aspect-ratio: 4 / 5;
  }

 
  ${media.mobile} {
    aspect-ratio: 4 / 5;
    border-radius: 18px;
    overflow: hidden;
  }
`;

