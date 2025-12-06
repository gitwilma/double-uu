"use client";

import styled from "styled-components";
import Link from "next/link";

export const FooterRoot = styled.footer`
  width: 100%;
  padding: 2rem 1rem;
  background-color: #f472b6;
  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  justify-content: center;
`;

export const NavWrapper = styled.nav.attrs({
  "aria-label": "Footer navigation",
})`
  display: flex;
  justify-content: center;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: center;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const FooterButton = styled(Link)`
  background-color: #fff;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  @media (min-width: 768px) {
    min-width: 140px;
    text-align: center;
  }
`;

export const FooterBottom = styled.div`
  text-align: center;
  font-size: 0.75rem;
  opacity: 0.7;
  width: 100%;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

export const AdminButton = styled.button`
  background-color: #fff;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-decoration: none;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  @media (min-width: 768px) {
    min-width: 140px;
  }
`;

export const LogoutButton = styled.button.attrs({ type: "button" })`
  background-color: #e11d48;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;
