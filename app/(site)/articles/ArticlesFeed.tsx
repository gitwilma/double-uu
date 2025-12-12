"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Article } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";
import { Page, Spacer, Viewport, ViewportInner } from "./styled";

function chunkPairs<T>(arr: T[]) {
  const out: Array<[T, T?]> = [];
  for (let i = 0; i < arr.length; i += 2) out.push([arr[i], arr[i + 1]]);
  return out;
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function ArticlesFeed({ articles }: { articles: Article[] }) {
  const pairs = useMemo(() => chunkPairs(articles), [articles]);
  const viewportRefs = useRef<Array<HTMLElement | null>>([]);
  const [progressByIdx, setProgressByIdx] = useState<Record<number, number>>({});

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const vh = window.innerHeight;
      const startEarlier = 0.15;

      const next: Record<number, number> = {};

      viewportRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const p = clamp01((vh - rect.top) / (vh * (1 - startEarlier)));
        next[idx] = p;
      });

      setProgressByIdx(next);
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Page>
      <Spacer />
      {pairs.map(([left, right], idx) => {
        const p = progressByIdx[idx] ?? 0;

        return (
          <Viewport
            key={`${left.id}-${right?.id ?? "none"}`}
            ref={(el) => {
              viewportRefs.current[idx] = el;
            }}
          >
            <ViewportInner>
              <ArticleCard article={left} side="left" progress={p} />
              {right ? (
                <ArticleCard article={right} side="right" progress={p} />
              ) : null}
            </ViewportInner>
          </Viewport>
        );
      })}
    </Page>
  );
}
