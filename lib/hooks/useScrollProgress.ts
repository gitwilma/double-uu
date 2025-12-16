"use client";

import { useEffect, useRef, useState } from "react";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function useScrollProgress(opts?: { lockOnScrollDown?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let raf = 0;
    lastScrollY.current = window.scrollY;

    const update = () => {
      const el = ref.current;
      if (!el) {
        raf = requestAnimationFrame(update);
        return;
      }

      const vh = window.innerHeight;
      const centerY = vh / 2;

      const currentY = window.scrollY;
      const scrollingDown = currentY >= lastScrollY.current;
      lastScrollY.current = currentY;

      const rect = el.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;

      const dist = Math.abs(sectionCenter - centerY);
      const norm = dist / (vh * 0.55);
      const raw = clamp01(1 - norm);

      setProgress((prev) => {
        if (opts?.lockOnScrollDown && scrollingDown) return Math.max(prev, raw);
        return raw;
      });

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [opts?.lockOnScrollDown]);

  return { ref, progress };
}
