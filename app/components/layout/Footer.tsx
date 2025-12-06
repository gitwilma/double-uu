"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

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
  LogoutButton,
} from "./Footer.styled";
import { AdminLoginModal } from "../modals/AdminLoginModal";
import { SubscribeModal } from "../modals/SubscribeModal";

export function Footer() {
  const year = new Date().getFullYear();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  const { data: session } = useSession();
  const isLoggedIn = !!session?.user?.email;

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

          {!isLoggedIn ? (
            <AdminButton type="button" onClick={() => setIsLoginOpen(true)}>
              Admin Login
            </AdminButton>
          ) : (
            <LogoutButton
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Log out
            </LogoutButton>
          )}
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
