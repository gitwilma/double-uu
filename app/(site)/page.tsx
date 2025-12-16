"use client";

import Link from "next/link";
import { Main, CenterNav, NavList, NavItem, NavLink } from "./home.styled";
import { HamburgerMenu } from "../components/navigation/HamburgerMenu";

export default function HomePage() {
  return (
    <>
      <HamburgerMenu />
      <Main id="main">
        <CenterNav aria-label="Primary navigation">
          <NavList>
            <NavItem>
              <NavLink as={Link} href="/articles">
                Magazine
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink as={Link} href="/about">
                About
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink as={Link} href="/creator">
                Creator
              </NavLink>
            </NavItem>
          </NavList>
        </CenterNav>
      </Main>
    </>
  );
}
