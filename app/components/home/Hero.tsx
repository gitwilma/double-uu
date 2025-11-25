"use client";

import Image from "next/image";
import { HeroWrapper } from "./Hero.styled";


export function Hero() {
  return (
    <HeroWrapper>
      <Image
        src="/illustrations/blazer-lady3.svg"
        alt="Blazer lady hero"
        fill
        priority
        className="object-contain bg-[#F5EDF8]"
      />
    </HeroWrapper>
  );
}
