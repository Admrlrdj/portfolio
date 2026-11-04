"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLang } from "@/components/i18n/useLang";
import type { Bi } from "@/lib/i18n";

type Props = { children: ReactNode; label: Bi; trackClassName?: string };

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

export function HSlider({ children, label: labels, trackClassName = "" }: Props) {
  const lang = useLang();
  const label = labels[lang];
  const prev = lang === "en" ? "Previous" : "sebelumnya";
  const nextWord = lang === "en" ? "Next" : "berikutnya";
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : 1;
    setCount(el.children.length);
    setIndex(Math.min(el.children.length - 1, Math.round(el.scrollLeft / step)));
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    el.scrollBy({ left: dir * (first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0")), behavior: "smooth" });
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !track.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      track.current.dataset.dragging = "true";
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    if (track.current) track.current.dataset.dragging = "false";
    drag.current = null;
  };
  // Seretan tidak boleh ikut membuka tautan di dalam kartu.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current?.moved) e.preventDefault();
  };

  return (
    <div className="hs">
      <div className="hs-bar">
        <p className="mono text-muted" aria-live="polite">
          {label} {count ? `${index + 1} / ${count}` : ""}
        </p>
        <div className="flex gap-2">
          <button type="button" className="hs-btn" aria-label={lang === "en" ? `${prev} ${label.toLowerCase()}` : `${label} ${prev}`} disabled={edge.start} onClick={() => go(-1)}>
            <Arrow dir="prev" />
          </button>
          <button type="button" className="hs-btn" aria-label={lang === "en" ? `${nextWord} ${label.toLowerCase()}` : `${label} ${nextWord}`} disabled={edge.end} onClick={() => go(1)}>
            <Arrow dir="next" />
          </button>
        </div>
      </div>
      <div
        ref={track}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClickCapture={onClickCapture}
        tabIndex={0}
        role="group"
        aria-label={label}
        className={`hs-track ${trackClassName}`}
      >
        {children}
      </div>
      <div className="hs-meter" aria-hidden="true">
        <span style={{ width: count ? `${((index + 1) / count) * 100}%` : "0%" }} />
      </div>
    </div>
  );
}
