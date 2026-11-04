"use client";

import { useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

const LIMIT = 150;

export function DraggableSticker({ children, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const grab = useRef<{ x: number; y: number } | null>(null);

  const clamp = (n: number) => Math.max(-LIMIT, Math.min(LIMIT, n));

  const onDown = (e: React.PointerEvent<HTMLSpanElement>) => {
    grab.current = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.dataset.drag = "true";
  };

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!grab.current || !ref.current) return;
    pos.current = { x: clamp(e.clientX - grab.current.x), y: clamp(e.clientY - grab.current.y) };
    ref.current.style.translate = `${pos.current.x}px ${pos.current.y}px`;
  };

  const onUp = (e: React.PointerEvent<HTMLSpanElement>) => {
    grab.current = null;
    e.currentTarget.dataset.drag = "false";
  };

  return (
    <span
      ref={ref}
      aria-hidden="true"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className={`sticker px-3 ${className}`}
    >
      {children}
    </span>
  );
}
