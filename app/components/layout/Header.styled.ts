"use client";

import styled from "styled-components";
import Link from "next/link";

export const HeaderRoot = styled.header`
  width: 100%;
  padding: 1rem 1rem;
  background-color: #f472b6;

  @media (min-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

export const HeaderInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;

  @media (min-width: 768px) {
    justify-content: flex-start;
    margin-bottom: 0;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const NavWrapper = styled.nav.attrs({
  "aria-label": "Huvudmeny",
})`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.75rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #ffffff;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

export const NavItem = styled.li``;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }
`;

export const SubscribeWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

export const SubscribeButton = styled(Link).attrs({
  "aria-label": "Subscribe to the magazine",
})`
  background-color: #000000;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }
`;
