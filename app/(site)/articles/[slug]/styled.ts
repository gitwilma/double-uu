"use client";

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

  @media (min-width: 900px) {
    grid-template-columns: 520px 1fr;
    gap: 40px;
    align-items: start;
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
`;

export const Head = styled.div`
  color: #111;
  align-self: start;
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
