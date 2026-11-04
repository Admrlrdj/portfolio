"use client";

import { useEffect, useRef } from "react";

const GAP = 30;
const PULL_R = 150;
const RIPPLE_SPEED = 0.65; // px per ms
const RIPPLE_LIFE = 1500;
const RIPPLE_BAND = 46;

type Ripple = { x: number; y: number; t: number };

// Latar titik-titik untuk hero: titik di dekat kursor menyingkir dan menyala, klik memunculkan gelombang.
// Loop animasi hanya berjalan saat ada interaksi dan section terlihat; tanpa interaksi kanvas digambar sekali saja.
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let colors = { dot: "#d6d1c4", hot: "#c23e1a" };
    const pointer = { x: -9999, y: -9999, on: false, strength: 0 };
    const ripples: Ripple[] = [];
    let raf = 0;
    let visible = true;

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colors = { dot: s.getPropertyValue("--line").trim() || colors.dot, hot: s.getPropertyValue("--accent").trim() || colors.hot };
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      draw(performance.now());
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (let i = ripples.length - 1; i >= 0; i -= 1) if (now - (ripples[i]?.t ?? 0) > RIPPLE_LIFE) ripples.splice(i, 1);

      const ox = (w % GAP) / 2;
      const oy = (h % GAP) / 2;
      for (let y = oy; y <= h; y += GAP) {
        for (let x = ox; x <= w; x += GAP) {
          let dx = 0;
          let dy = 0;
          let heat = 0;

          if (pointer.strength > 0.01) {
            const px = x - pointer.x;
            const py = y - pointer.y;
            const d = Math.hypot(px, py);
            if (d < PULL_R && d > 0.001) {
              const f = (1 - d / PULL_R) ** 2 * pointer.strength;
              dx += (px / d) * f * 16;
              dy += (py / d) * f * 16;
              heat = Math.max(heat, f);
            }
          }

          for (const r of ripples) {
            const age = now - r.t;
            const radius = age * RIPPLE_SPEED;
            const rx = x - r.x;
            const ry = y - r.y;
            const d = Math.hypot(rx, ry);
            const band = 1 - Math.abs(d - radius) / RIPPLE_BAND;
            if (band > 0 && d > 0.001) {
              const f = band * (1 - age / RIPPLE_LIFE);
              dx += (rx / d) * f * 12;
              dy += (ry / d) * f * 12;
              heat = Math.max(heat, f);
            }
          }

          const size = 1.3 + heat * 2.6;
          ctx.globalAlpha = 0.55 + heat * 0.45;
          ctx.fillStyle = heat > 0.08 ? colors.hot : colors.dot;
          ctx.beginPath();
          ctx.arc(x + dx, y + dy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      pointer.strength += ((pointer.on ? 1 : 0) - pointer.strength) * 0.12;
      draw(now);
      const busy = ripples.length > 0 || pointer.on || pointer.strength > 0.01;
      raf = busy && visible ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const local = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const p = local(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.on = true;
      kick();
    };
    const onLeave = () => {
      pointer.on = false;
      kick();
    };
    const onDown = (e: PointerEvent) => {
      // Klik pada tombol, tautan, avatar, atau balon kata tidak memicu gelombang.
      if ((e.target as Element).closest("a, button, .av, .sticker, [role=button], input")) return;
      const p = local(e);
      ripples.push({ x: p.x, y: p.y, t: performance.now() });
      if (ripples.length > 6) ripples.shift();
      kick();
    };

    readColors();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const mo = new MutationObserver(() => {
      readColors();
      draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) kick();
    });
    io.observe(host);

    if (!calm) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerdown", onDown);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="dot-field" />;
}
