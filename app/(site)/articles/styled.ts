import styled, { css } from "styled-components";
import Link from "next/link";

export const Page = styled.div`
  min-height: 100vh;
  background: #23062e;
`;

export const Spacer = styled.div`
  height: 24px;
`;

export const Viewport = styled.section`
  height: 100vh;
  position: relative;
`;

export const ViewportInner = styled.div`
  position: relative;
  height: 100%;
  --cardW: min(450px, calc(100vw - 40px));
  --edge: 40px;
  --gap: 28px;
`;

export const CardLink = styled(Link)`
  display: contents;
`;

export const CardShell = styled.article<{
  $side: "left" | "right";
  $progress: number;
}>`
  position: absolute;
  top: 50%;

  width: min(450px, calc(100vw - 40px));
  height: min(515px, calc(100vh - 120px));
  max-width: 450px;
  max-height: 515px;

  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);

  ${({ $side }) =>
    $side === "left"
      ? css`left: 40px;`
      : css`right: 40px;`}

  ${({ $side, $progress }) => {
    const p = Math.max(0, Math.min(1, $progress));

    const cardWidth = 450;
    const extra = 80;
    const startOffset = cardWidth + extra;

    const x = ($side === "left" ? -1 : 1) * (1 - p) * startOffset;
    const y = -50;

    return css`
      opacity: 1;
      transform: translate3d(${x}px, ${y}%, 0);
      transition: transform 0.05s linear;
      will-change: transform;
    `;
  }}

  @media (max-width: 900px) {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    transform: none;
    margin: 0 auto 24px;
    height: auto;
    max-height: none;
    width: calc(100vw - 32px);
    max-width: 520px;

    opacity: 1;
    transition: none;
  }
`;

export const Media = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.50);
  transition: background 300ms ease;

  ${CardShell}:hover & {
    background: rgba(0,0,0,0.0);
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

  @media (max-width: 900px) {
    position: relative;
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
    margin: 12px auto 24px;
    max-width: 520px;
    text-align: left;
    opacity: 1;
    transition: none;
  }
`;

export const Title = styled.h2`
  margin: 0;
  color: #000;
  font-size: clamp(42px, 6vw, 64px);
  line-height: 0.95;
  letter-spacing: -0.02em;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  margin: 10px 0 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  line-height: 1.35;
`;
