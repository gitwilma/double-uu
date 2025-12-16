"use client";

import styled from "styled-components";

export const Main = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 96px 20px 40px;
`;

export const CenterNav = styled.nav`
  width: min(980px, 100%);
`;

export const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: grid;
  gap: 16px;

  grid-template-columns: 1fr;

`;

export const NavItem = styled.li`
  margin: 0;
`;

export const NavLink = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  padding: 22px 18px;

  border-radius: 22px;
  text-decoration: none;
  font-weight: 750;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  color: rgba(0, 0, 0, 0.92);
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);

  transition: transform 160ms ease, background 160ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.7);
  }

  &:active {
    transform: translateY(0);
  }
`;
