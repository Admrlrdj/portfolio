"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

// Kubus isometrik dari 12 serpihan segitiga. Serpihan menyatu saat bagiannya tepat di layar dan
// berhamburan lagi saat digulir ke atas atau ke bawah; posisinya dihitung dari scroll, jadi dua arah sama.
const T = [100, 20], UL = [30.7, 60], UR = [169.3, 60], C = [100, 100];
const LL = [30.7, 140], LR = [169.3, 140], B = [100, 180];
const TC = [100, 60], LC = [65.4, 120], RC = [134.6, 120];

const faces: { face: "top" | "left" | "right"; pts: number[][] }[] = [
  ...[[T, UR], [UR, C], [C, UL], [UL, T]].map(([a, b]) => ({ face: "top" as const, pts: [a!, b!, TC] })),
  ...[[UL, C], [C, B], [B, LL], [LL, UL]].map(([a, b]) => ({ face: "left" as const, pts: [a!, b!, LC] })),
  ...[[C, UR], [UR, LR], [LR, B], [B, C]].map(([a, b]) => ({ face: "right" as const, pts: [a!, b!, RC] })),
];

function scatter(i: number, seed: number) {
  const a = ((i * 137.5 + seed * 61) % 360) * (Math.PI / 180);
  const d = 120 + ((i * 53 + seed * 29) % 110);
  return { dx: Math.round(Math.cos(a) * d), dy: Math.round(Math.sin(a) * d), r: ((i * 97 + seed * 43) % 240) - 120 };
}

export function Shards({ seed = 0 }: { seed?: number }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const t = section.getBoundingClientRect().top / window.innerHeight;
      const p = Math.min(1, Math.max(0, 1 - Math.abs(t) * 1.4));
      el.style.setProperty("--p", (p * p * (3 - 2 * p)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={box} className="shards" aria-hidden="true">
      <svg viewBox="0 0 200 200" focusable="false">
        {faces.map((f, i) => {
          const s = scatter(i, seed);
          return (
            <polygon
              key={i}
              points={f.pts.map((p) => p.join(",")).join(" ")}
              className={`shard shard-${f.face}`}
              style={{ "--dx": s.dx, "--dy": s.dy, "--r": s.r } as CSSProperties}
            />
          );
        })}
      </svg>
    </div>
  );
}
