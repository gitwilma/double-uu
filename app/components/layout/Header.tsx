"use client";

import Image from "next/image";
import {
  HeaderRoot,
  HeaderInner,
  LogoWrapper,
  RightSide,
  NavWrapper,
  NavList,
  NavItem,
  NavLink,
  SubscribeWrapper,
  SubscribeButton,
} from "./Header.styled";

export function Header() {
  return (
    <HeaderRoot>
      <HeaderInner>
        <LogoWrapper href="/" aria-label="Gå till startsidan">
          <Image
            src="/logo1.svg"
            alt="Double UU logo"
            width={80}
            height={80}
            style={{ objectFit: "contain" }}
          />
        </LogoWrapper>

        <RightSide>
          <NavWrapper>
            <NavList>
              <NavItem>
                <NavLink href="/articles">MAGAZINE</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">ABOUT</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/creator">CREATOR</NavLink>
              </NavItem>
            </NavList>
          </NavWrapper>

          <SubscribeWrapper>
            <SubscribeButton href="/subscribe">
              Subscribe
            </SubscribeButton>
          </SubscribeWrapper>
        </RightSide>
      </HeaderInner>
    </HeaderRoot>
  );
}
