import styled, { css, keyframes } from "styled-components";
import Link from "next/link";

const slideInLeft = keyframes`
  from { transform: translate3d(-80px, -50%, 0); opacity: 0; }
  to   { transform: translate3d(0, -50%, 0); opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translate3d(80px, -50%, 0); opacity: 0; }
  to   { transform: translate3d(0, -50%, 0); opacity: 1; }
`;

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
`;

export const CardLink = styled(Link)`
  display: contents;
`;

export const CardShell = styled.article<{ $side: "left" | "right"; $active: boolean }>`
  position: absolute;
  top: 50%;
  width: min(450px, calc(100vw - 40px));
  height: min(515px, calc(100vh - 120px));
  max-width: 450px;
  max-height: 515px;

  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);

  ${({ $side }) =>
    $side === "left"
      ? css`left: 20px;`
      : css`right: 20px;`}

  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: translate3d(0, -50%, 0);

  ${({ $active, $side }) =>
    $active &&
    css`
      animation: ${$side === "left" ? slideInLeft : slideInRight} 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
    `}

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
    animation: none;
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

export const Meta = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: 16px;
  pointer-events: none;

  h2 {
    margin: 0;
    color: #fff;
    font-size: 18px;
    font-weight: 650;
    letter-spacing: 0.2px;
  }

  p {
    margin: 10px 0 0;
    color: rgba(255,255,255,0.85);
    font-size: 14px;
    line-height: 1.4;
  }
`;
