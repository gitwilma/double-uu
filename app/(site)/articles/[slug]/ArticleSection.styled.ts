"use client";

import styled, { css } from "styled-components";

export const Section = styled.section<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin: 140px 0;

  ${({ $reverse }) =>
    $reverse &&
    css`
      direction: rtl;
      > * {
        direction: ltr;
      }
    `}
`;

export const Media = styled.div<{ $progress: number }>`
  position: relative;
  aspect-ratio: 3 / 4;
  transform: translateY(${({ $progress }) => (1 - $progress) * 120}px);
  transition: transform 0.05s linear;
`;

export const Text = styled.div<{ $progress: number; $reverse?: boolean }>`
  max-width: 40ch;

  transform: translateX(
    ${({ $progress, $reverse }) =>
      (1 - $progress) * ($reverse ? -80 : 80)}px
  );

  transition: transform 0.05s linear;

  h3 {
    margin: 0 0 12px;
    font-size: 32px;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 18px;
    line-height: 1.6;
  }
`;
