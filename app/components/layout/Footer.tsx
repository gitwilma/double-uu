"use client";

import Image from "next/image";
import {
  FooterRoot,
  LogoWrapper,
  NavWrapper,
  NavList,
  NavLink,
  ButtonRow,
  FooterButton,
  FooterBottom,
} from "./Footer.styled";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterRoot>
      <LogoWrapper href="/" aria-label="Go to homepage">
        <Image
          src="/logo1.svg"
          alt="Double UU logo"
          width={80}
          height={80}
          style={{ objectFit: "contain" }}
        />
      </LogoWrapper>

      <NavWrapper>
        <NavList>
          <li><NavLink href="/articles">MAGAZINE</NavLink></li>
          <li><NavLink href="/about">ABOUT</NavLink></li>
          <li><NavLink href="/creator">CREATOR</NavLink></li>
        </NavList>
      </NavWrapper>

      <ButtonRow>
        <FooterButton href="/subscribe">Subscribe</FooterButton>
        <FooterButton href="/admin">Admin Login</FooterButton>
      </ButtonRow>

      <FooterBottom>
        © {year} Double UU. All rights reserved.
      </FooterBottom>
    </FooterRoot>
  );
}
