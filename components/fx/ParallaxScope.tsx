"use client";

import { useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; id?: string };

// Mengisi --mx dan --my (-1 sampai 1); elemen anak memakainya lewat kelas .px-*. Hanya mouse, bukan sentuh.
export function ParallaxScope({ children, className = "", id }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const reset = () => {
    ref.current?.style.setProperty("--mx", "0");
    ref.current?.style.setProperty("--my", "0");
  };

  return (
    <section ref={ref} id={id} onPointerMove={onMove} onPointerLeave={reset} className={className}>
      {children}
    </section>
  );
}
