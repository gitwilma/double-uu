"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

import { AdminLoginModal } from "@/app/components/modals/AdminLoginModal";
import { SubscribeModal } from "@/app/components/modals/SubscribeModal";

import {
  Root,
  BrandArea,
  LogoWrap,
  BurgerButton,
  BurgerLines,
  Backdrop,
  Drawer,
  Nav,
  NavLink,
  MidBlock,
  MidTitle,
  MidText,
  Bottom,
  BottomTitle,
  SmallLinks,
  ActionButton,
  FooterCopy,
} from "./HamburgerMenu.styled";

type NavItem = { label: string; href: string };

type Props = {
  navItems?: NavItem[];
  midTitle?: string;
  midText?: string;
};

export function HamburgerMenu({
  navItems = [
    { label: "MAGAZINE", href: "/articles" },
    { label: "ABOUT", href: "/about" },
    { label: "CREATOR", href: "/creator" },
  ],
  midTitle = "Rubrik",
  midText = "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum.",
}: Props) {
  const [open, setOpen] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  const { data: session } = useSession();
  const isLoggedIn = !!session?.user?.email;

  const year = new Date().getFullYear();

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <Root>
        <BrandArea>
          <LogoWrap>
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/logo1.svg"
                alt="Double UU logo"
                width={72}
                height={72}
                style={{ objectFit: "contain" }}
              />
            </Link>
          </LogoWrap>

          <BurgerButton
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <BurgerLines $open={open}>
              <span />
            </BurgerLines>
          </BurgerButton>
        </BrandArea>

        <Backdrop $open={open} onClick={closeMenu} />

        <Drawer $open={open} role="dialog" aria-modal="true" aria-label="Menu">
          <Nav aria-label="Primary">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </NavLink>
            ))}
          </Nav>

          <MidBlock>
            <MidTitle>{midTitle}</MidTitle>
            <MidText>{midText}</MidText>
          </MidBlock>

          <Bottom>
            <BottomTitle>Footer</BottomTitle>

            <SmallLinks aria-label="Footer actions">
              <ActionButton
                as="a"
                href="#subscribe"
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  setIsSubscribeOpen(true);
                }}
              >
                Subscribe
              </ActionButton>

              {!isLoggedIn ? (
                <ActionButton
                  as="button"
                  type="button"
                  onClick={() => {
                    closeMenu();
                    setIsLoginOpen(true);
                  }}
                >
                  Admin Login
                </ActionButton>
              ) : (
                <ActionButton
                  as="button"
                  type="button"
                  onClick={() => {
                    closeMenu();
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Log out
                </ActionButton>
              )}
            </SmallLinks>

            <FooterCopy>© {year} Double UU. All rights reserved.</FooterCopy>
          </Bottom>
        </Drawer>
      </Root>
      
      <AdminLoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SubscribeModal isOpen={isSubscribeOpen} onClose={() => setIsSubscribeOpen(false)} />
    </>
  );
}
