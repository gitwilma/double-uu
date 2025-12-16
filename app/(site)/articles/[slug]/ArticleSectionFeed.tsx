"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ArticleSection } from "@/lib/types";
import { ImageImport } from "@/app/components/common/ImageImport";
import {
  Feed,
  Viewport,
  ViewportInner,
  CardShell,
  Media,
  TextPanel,
  SectionTitle,
  SectionBody,
} from "./ArticleSectionFeed.styled";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function ArticleSectionsFeed({ sections }: { sections: ArticleSection[] }) {
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

  const safeSections = useMemo(
    () => (Array.isArray(sections) ? sections.filter((s) => s?.image) : []),
    [sections]
  );

  return (
    <Feed aria-label="Article sections">
      {safeSections.map((section, idx) => {
        const p = progressByIdx[idx] ?? 0;
        const side = idx % 2 === 0 ? "left" : "right";

        return (
          <Viewport
            key={`${section.image}-${idx}`}
            ref={(el) => {
              viewportRefs.current[idx] = el;
            }}
            aria-label={`Section ${idx + 1}`}
          >
            <ViewportInner>
              <CardShell $side={side} $progress={p}>
                <Media>
                  <ImageImport
                    src={section.image!}
                    alt={section.subtitle || `Section image ${idx + 1}`}
                    fill
                    className="absolute inset-0 object-cover"
                  />
                </Media>
              </CardShell>

              <TextPanel $side={side} $progress={p} aria-label="Section text">
                <SectionTitle>{section.subtitle}</SectionTitle>
                <SectionBody>{section.body}</SectionBody>
              </TextPanel>
            </ViewportInner>
          </Viewport>
        );
      })}
    </Feed>
  );
}
