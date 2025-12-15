"use client";

import styled from "styled-components";

export const Page = styled.main`
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  background:
    radial-gradient(60% 50% at 40% 20%, #f7b78d 0%, transparent 60%),
    radial-gradient(55% 45% at 85% 15%, #f4a9c8 0%, transparent 60%),
    radial-gradient(45% 45% at 25% 75%, #f2b3d6 0%, transparent 65%),
    radial-gradient(40% 40% at 50% 50%, #d7c8f5 0%, transparent 70%),
    #f4a9c8;

  &::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.4 -0.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    background-size: 260px 260px;
    background-repeat: repeat;
    mix-blend-mode: soft-light;
    opacity: 0.85;
    filter: contrast(160%) brightness(105%);
  }
`;

export const Inner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 980px;
  margin: 0 auto;
  padding: 110px 20px 80px;
`;

export const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;

  @media (min-width: 900px) {
    grid-template-columns: 420px 1fr;
    align-items: end;
    gap: 34px;
  }
`;

export const Cover = styled.div`
  width: 100%;
  max-width: 420px;
  aspect-ratio: 3 / 4;
  border-radius: 24px;
  overflow: hidden;

  box-shadow: 0 28px 60px -18px rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.18);

  position: relative;
`;

export const Head = styled.div`
  color: #111;
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.95;
  font-size: clamp(44px, 6.5vw, 78px);
`;

export const MetaRow = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.72);
`;

export const Body = styled.article`
  margin-top: 34px;
  max-width: 70ch;
  color: rgba(0, 0, 0, 0.88);
  font-size: 18px;
  line-height: 1.65;

  p {
    margin: 0 0 18px;
  }
`;
