"use client";

import styled, { css } from "styled-components";

export const Feed = styled.section`
  margin-top: 32px;
  display: grid;
  gap: 120px;

  @media (max-width: 900px) {
    gap: 64px;
  }
`;

export const Viewport = styled.section`
  min-height: 100vh;
  position: relative;
  display: grid;
  align-items: start;
`;

export const ViewportInner = styled.div`
  position: relative;
  height: 100%;
  --cardW: min(520px, calc(100vw - 32px));
  --edge: 18px;
  --gap: 22px;

  @media (max-width: 900px) {
    --edge: 0px;
  }
`;

export const CardShell = styled.article<{ $side: "left" | "right"; $progress: number }>`
  position: absolute;
  z-index: 2;
  top: 12vh;

  width: var(--cardW);
  max-width: 520px;

  height: min(640px, calc(100vh - 220px));
  max-height: 640px;

  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 60px 40px -18px rgba(0, 0, 0, 0.45);

  ${({ $side }) =>
    $side === "left"
      ? css`left: var(--edge);`
      : css`right: var(--edge);`}

  ${({ $side, $progress }) => {
    const p = Math.max(0, Math.min(1, $progress));

    const cardWidth = 520;
    const extra = 60;
    const startOffset = cardWidth + extra;

    const x = ($side === "left" ? -1 : 1) * (1 - p) * startOffset;

    return css`
      transform: translate3d(${x}px, 0, 0);
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
    height: auto;
    max-height: none;
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
    transition: none;
  }
`;

export const Media = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const TextPanel = styled.aside<{ $side: "left" | "right"; $progress: number }>`
  position: absolute;
  z-index: 3;
  top: 12vh;

  width: min(420px, calc(100vw - 32px));
  max-height: min(520px, calc(100vh - 240px));
  overflow: auto;

  padding: 18px 18px 16px;
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  ${({ $progress }) => {
    const p = Math.max(0, Math.min(1, $progress));
    const delay = 0.18;
    const ramp = Math.max(0, Math.min(1, (p - delay) / (1 - delay)));
    return css`
      opacity: ${ramp};
      transition: opacity 0.8s linear;
      will-change: opacity;
    `;
  }}

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

  scrollbar-gutter: stable both-edges;

  @media (max-width: 900px) {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    width: 100%;
    max-width: 560px;
    max-height: none;
    margin: 14px auto 0;
    opacity: 1;
    transition: none;
    text-align: left;
  }
`;

export const SectionTitle = styled.h2`
font-family: var(--font-title);
font-weight: 400;
  margin: 0;
  color: #111;
  font-size: 28px;
  line-height: 1.05;
  letter-spacing: -0.02em;
`;

export const SectionBody = styled.p`
  margin: 12px 0 0;
  color: rgba(0, 0, 0, 0.86);
  font-size: 16px;
  line-height: 1.6;
`;
