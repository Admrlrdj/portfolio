import type { ReactNode } from "react";

export type P3 = readonly [number, number, number];
export type Box3 = readonly [number, number, number, number, number, number];

const SCALE = 24;
const ORIGIN_X = 320;
const ORIGIN_Y = 190;

export function xy([x, y, z]: P3): [number, number] {
  return [ORIGIN_X + (x - y) * SCALE * 0.866, ORIGIN_Y + (x + y) * SCALE * 0.5 - z * SCALE];
}

export function pt(p: P3) {
  const [sx, sy] = xy(p);
  return `${sx.toFixed(1)},${sy.toFixed(1)}`;
}

export function points(...list: P3[]) {
  return list.map(pt).join(" ");
}

export function Line({ from, to, color }: { from: P3; to: P3; color: string }) {
  const [x1, y1] = xy(from);
  const [x2, y2] = xy(to);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: color }} />;
}

export const tone = (pct: number) => `color-mix(in srgb, var(--ink) ${pct}%, var(--paper))`;

export function Quad({ pts, pct }: { pts: P3[]; pct: number }) {
  return <polygon points={points(...pts)} style={{ fill: tone(pct) }} />;
}

export function Box({ b, tones = [30, 22, 38] }: { b: Box3; tones?: readonly [number, number, number] }) {
  const [x0, y0, z0, x1, y1, z1] = b;
  const [top, xFace, yFace] = tones;
  return (
    <>
      <Quad pct={xFace} pts={[[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]]} />
      <Quad pct={yFace} pts={[[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]]} />
      <Quad pct={top} pts={[[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]} />
    </>
  );
}

export function viewBoxFor(list: P3[], pad = 6) {
  const pts = list.map(xy);
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const x = Math.min(...xs) - pad;
  const y = Math.min(...ys) - pad;
  const w = Math.max(...xs) - Math.min(...xs) + pad * 2;
  const h = Math.max(...ys) - Math.min(...ys) + pad * 2;
  return `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`;
}

export function IsoSvg({ box, className, children }: { box: P3[]; className?: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBoxFor(box)} aria-hidden="true" focusable="false" className={className}>
      <g stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="1" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}
