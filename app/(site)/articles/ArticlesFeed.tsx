"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Article } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";
import { Page, Viewport, ViewportInner, Spacer } from "./styled";

type Props = { articles: Article[] };

function chunkPairs<T>(arr: T[]) {
  const out: Array<[T, T?]> = [];
  for (let i = 0; i < arr.length; i += 2) out.push([arr[i], arr[i + 1]]);
  return out;
}

export default function ArticlesFeed({ articles }: Props) {
  const pairs = useMemo(() => chunkPairs(articles), [articles]);
  const viewportRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const nodes = viewportRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number(e.target.getAttribute("data-idx"));
          if (Number.isNaN(idx)) return;
          if (e.isIntersecting) setActive((s) => ({ ...s, [idx]: true }));
        });
      },
      { threshold: 0.35 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pairs.length]);

  return (
    <Page>
      <Spacer />

      {pairs.map(([left, right], idx) => (
        <Viewport
          key={`${left.id}-${right?.id ?? "none"}`}
          ref={(el) => {
            viewportRefs.current[idx] = el;
          }}
          data-idx={idx}
        >
          <ViewportInner>
            <ArticleCard article={left} side="left" active={!!active[idx]} />

            {right ? (
              <ArticleCard article={right} side="right" active={!!active[idx]} />
            ) : null}
          </ViewportInner>
        </Viewport>
      ))}
    </Page>
  );
}
