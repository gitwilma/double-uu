import styled, { css } from "styled-components";
import Link from "next/link";

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
  padding: 10px 10px;
  border-radius: 14px;

  background: rgba(236, 233, 227, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(6px);

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
  background: #ece9e3;
  border-right: 2px solid rgba(0, 0, 0, 0.35);

  display: flex;
  flex-direction: column;
  padding: 22px 22px 26px;

  transform: translate3d(${({ $open }) => ($open ? "0" : "-105%")}, 0, 0);
  transition: transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1);

  box-shadow: 24px 0 80px rgba(0, 0, 0, 0.25);
  z-index: 66;
`;

export const Nav = styled.nav`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
`;

export const MidBlock = styled.div`
  margin-top: auto;
  margin-bottom: 38px;
  max-width: 300px;
`;

export const MidTitle = styled.div`
  font-weight: 700;
  color: #111;
  margin-bottom: 6px;
  font-size: 14px;
`;

export const MidText = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 13px;
  line-height: 1.35;
`;

export const Bottom = styled.div`
  padding-top: 12px;
`;

export const BottomTitle = styled.div`
  font-weight: 900;
  font-size: 30px;
  color: #111;
  line-height: 1;
`;

export const SmallLinks = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
`;

export const ActionLink = styled(Link)`
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
`;


export const FooterCopy = styled.div`
  margin-top: 12px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
`;
