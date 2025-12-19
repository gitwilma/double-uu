import styled, { css } from "styled-components";
import Link from "next/link";
import { spacing } from "@/lib/styles/spacing";
import { typography } from "@/lib/styles/typography";

export const Root = styled.div`
  position: relative;
  z-index: 60;
`;

export const BrandArea = styled.div`
  position: fixed;
  top: 18px;
  left: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 70;
`;

export const LogoWrap = styled.div`
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

export const BurgerButton = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;

  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 14px;

  display: grid;
  place-items: center;

  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: none;

  &:hover {
    opacity: 0.9;
  }
`;

export const BurgerLines = styled.div<{ $open: boolean }>`
  position: relative;
  width: 30px;
  height: 22px;

  &::before,
  &::after,
  span {
    content: "";
    position: absolute;
    left: 0;
    width: 30px;
    height: 3px;
    background: #111;
    border-radius: 2px;
    transition: transform 240ms ease, top 240ms ease, opacity 200ms ease;
  }

  span {
    top: 9.5px;
  }
  &::before {
    top: 0;
  }
  &::after {
    top: 19px;
  }

  ${({ $open }) =>
    $open &&
    css`
      span {
        opacity: 0;
      }
      &::before {
        top: 9.5px;
        transform: rotate(45deg);
      }
      &::after {
        top: 9.5px;
        transform: rotate(-45deg);
      }
    `}
`;

export const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.28);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 220ms ease;
  z-index: 65;
`;

export const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;

  width: min(360px, 88vw);

  background:
    radial-gradient(70% 70% at 50% 50%, #F5A4DF 0%, transparent 60%),
    radial-gradient(60% 50% at 40% 20%, #efefef 0%, transparent 60%),
    radial-gradient(45% 45% at 25% 75%, #efefef 0%, transparent 65%),
    #efefef;

  border-right: 2px solid rgba(0, 0, 0, 0.35);

  display: flex;
  flex-direction: column;
  padding: ${spacing.lg} ${spacing.lg} ${spacing.lg};

  transform: translate3d(${({ $open }) => ($open ? "0" : "-105%")}, 0, 0);
  transition: transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1);

  box-shadow: 24px 0 80px rgba(0, 0, 0, 0.25);
  z-index: 66;
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.4 -0.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    background-size: 260px 260px;
    background-repeat: repeat;
    mix-blend-mode: soft-light;
    opacity: 0.75;
    filter: contrast(160%) brightness(105%);
  }
  > * {
    position: relative;
    z-index: 1;
  }
`;

export const Nav = styled.nav`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const NavLink = styled(Link)`
  color: #111;
  text-decoration: none;
  font-weight: 900;
  letter-spacing: 0.02em;
  font-size: 28px;
  line-height: 1.08;

  &:hover {
    opacity: 0.75;
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.8);
    outline-offset: 4px;
    border-radius: 10px;
  }
`;

export const MidBlock = styled.div`
  margin-top: auto;
  margin-bottom: ${spacing.lg};
  max-width: 300px;
  display: grid;
  gap: ${spacing.sm};
`;

export const MidTitle = styled.div`
  font-family: ${typography.title.family};
  font-weight: 700;
  color: #111;
  font-size: 22px;
  letter-spacing: 0.02em;
`;

export const MidText = styled.p`
  margin: 0;
  font-family: ${typography.body.family};
  color: rgba(0, 0, 0, 0.85);
  font-size: 13px;
  line-height: 1.35;
`;

export const Bottom = styled.div`
  padding-top: 12px;
  background: rgba(255, 255, 255, 0.22);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;

  padding: ${spacing.md};
`;


export const BottomTitle = styled.div`
  font-family: ${typography.title.family};
  font-weight: 700;
  font-size: 28px;
  color: #111;
  line-height: 1;
`;

export const SmallLinks = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
`;

export const ActionButton = styled.button`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.75);
  text-decoration: none;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.8);
    outline-offset: 4px;
    border-radius: 10px;
  }
`;

export const FooterCopy = styled.div`
  margin-top: 12px;
  margin-bottom: 8px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.58);
`;

export const MidAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;

  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export const MidLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

export const MidExternalLink = styled.a`
  font-size: 12px;
  font-family: ${typography.body.family};
  color: rgba(0, 0, 0, 0.75);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.8);
    outline-offset: 3px;
    border-radius: 8px;
  }
`;

export const MidProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

export const MidAddress = styled.address`
  display: flex;
  flex-direction: column;
  font-style: normal;
`;

export const MidName = styled.div`
  font-weight: 800;
  font-size: 13px;
  color: #111;
  margin-bottom: 4px;
`;