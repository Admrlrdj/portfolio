"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { children: ReactNode; strength?: number; radius?: number; className?: string };

// Tarikan dibatasi supaya tombol tidak menimpa tetangganya (jarak antar tombol 12 px).
const MAX_PULL = 6;

export function Magnetic({ children, strength = 0.25, radius = 60, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !fine || calm) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const reach = Math.max(r.width, r.height) / 2 + radius;
      if (Math.hypot(dx, dy) > reach) {
        el.style.transform = "";
        return;
      }
      const pull = (n: number) => Math.max(-MAX_PULL, Math.min(MAX_PULL, n * strength)).toFixed(1);
      el.style.transform = `translate3d(${pull(dx)}px, ${pull(dy)}px, 0)`;
    };
    const reset = () => {
      el.style.transform = "";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [strength, radius]);

  return (
    <span ref={ref} className={`magnetic inline-flex ${className}`}>
      {children}
    </span>
  );
}
