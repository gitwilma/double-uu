"use client";

import Image from "next/image";
import { useState } from "react";

import {
  FooterRoot,
  LogoWrapper,
  NavWrapper,
  NavList,
  NavLink,
  ButtonRow,
  FooterButton,
  FooterBottom,
  AdminButton,
} from "./Footer.styled";
import { AdminLoginModal } from "../modals/AdminLoginModal";
import { SubscribeModal } from "../modals/SubscribeModal";

export function Footer() {
  const year = new Date().getFullYear();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  return (
    <>
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
            <li>
              <NavLink href="/articles">MAGAZINE</NavLink>
            </li>
            <li>
              <NavLink href="/about">ABOUT</NavLink>
            </li>
            <li>
              <NavLink href="/creator">CREATOR</NavLink>
            </li>
          </NavList>
        </NavWrapper>

        <ButtonRow>
          <FooterButton
            href="#subscribe"
            onClick={(e) => {
              e.preventDefault();
              setIsSubscribeOpen(true);
            }}
          >
            Subscribe
          </FooterButton>

          <AdminButton type="button" onClick={() => setIsLoginOpen(true)}>
            Admin Login
          </AdminButton>
        </ButtonRow>

        <FooterBottom>© {year} Double UU. All rights reserved.</FooterBottom>
      </FooterRoot>

      <AdminLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />
    </>
  );
}
