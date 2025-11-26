"use client";

import Image from "next/image";
import { HeroWrapper } from "./Hero.styled";
import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

const MIN_ZOOM = 1;
const MAX_ZOOM = 10;
const ZOOM_STEP = 0.05;

export function Hero() {
  const [zoom, setZoom] = useState(1);
  const [hasNavigated] = useState(false);
  const router = useRouter();

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      event.preventDefault();

      const direction = event.deltaY < 0 ? 1 : -1;

      setZoom((prev) => {
        const next = Math.min(
          MAX_ZOOM,
          Math.max(MIN_ZOOM, prev + direction * ZOOM_STEP)
        );
        return next;
      });
    },
    []
  );

  useEffect(() => {
    if (!hasNavigated && zoom >= MAX_ZOOM) {
      router.push("/inner");
    }
  }, [zoom, hasNavigated, router]);

  return (
    <HeroWrapper
      onWheel={handleWheel}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ scale: zoom }}
        transition={{ type: "spring", stiffness: 20, damping: 30 }}

        style={{ originX: 0.65, originY: 0.6 }}
      >
        <Image
          src="/illustrations/blazer-lady3.svg"
          alt="Blazer lady hero"
          fill
          priority
          className="object-contain bg-[#F5EDF8]"
        />
        <Image
          src="/illustrations/Group.svg"
          alt="Overlay group"
          width={80}
          height={80}
          className="pointer-events-none absolute left-5/8 top-5/9 -translate-x-2/4 -translate-y-1/4"
          priority
        />
      </motion.div>
    </HeroWrapper>
  );
}
