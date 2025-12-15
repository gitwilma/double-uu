"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollProgress() {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = vh / 2;
      const elCenter = rect.top + rect.height / 2;

      const dist = Math.abs(elCenter - center);
      const norm = Math.min(1, dist / (vh * 0.6));
      const p = 1 - norm;

      setProgress(Math.max(0, Math.min(1, p)));
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { ref, progress };
}
