import type { CSSProperties, ReactNode } from "react";
import { Box, tone, type Box3 } from "@/components/scene/iso";

const len = (n: number) => ({ "--len": n }) as CSSProperties;
const ink = "var(--ink)";
const accent = "var(--accent)";

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" focusable="false" className="cover h-full w-full">
      <rect width="320" height="180" style={{ fill: tone(6) }} />
      {children}
    </svg>
  );
}

function LoopaCover() {
  return (
    <Frame>
      <circle cx="104" cy="96" r="46" fill="none" stroke={ink} strokeWidth="2.5" />
      <path d="M82 92q8 9 16 0M110 92q8 9 16 0" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M92 118q12 8 24 0" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      <g fill="none" stroke={accent} strokeWidth="3" strokeLinecap="square">
        <path className="draw" style={len(240)} d="M68 78h72v28H68z" />
      </g>
      <rect x="146" y="64" width="78" height="18" rx="3" style={{ fill: accent }} />
      <text x="153" y="77" fontSize="11" fontFamily="var(--font-plex), monospace" style={{ fill: "var(--accent-ink)" }}>
        eye_closed
      </text>
      <circle cx="262" cy="108" r="30" fill="none" style={{ stroke: tone(18) }} strokeWidth="9" />
      <path className="draw" style={len(120)} d="M262 78a30 30 0 0 1 30 30" fill="none" stroke={ink} strokeWidth="9" strokeLinecap="round" />
      <g stroke={ink} strokeWidth="2" strokeLinecap="round">
        <path d="M262 108V92M262 108l10 6" />
      </g>
    </Frame>
  );
}

function SiagaCover() {
  return (
    <Frame>
      <g style={{ fill: tone(14) }} stroke={ink} strokeOpacity="0.35" strokeWidth="1">
        <path d="M18 34l54-10 34 22-6 46-52 8-34-26z" />
        <path d="M82 120l40-6 20 26-24 24-44-8z" />
        <path d="M112 30l46 6 10 34-30 20-34-18z" />
      </g>
      <path d="M26 150C60 120 92 110 130 84S172 52 196 44" fill="none" stroke={ink} strokeWidth="2.5" strokeDasharray="1 7" strokeLinecap="round" />
      <g transform="translate(132 28)">
        <path d="M18 0C8 0 0 8 0 18c0 14 18 30 18 30s18-16 18-30C36 8 28 0 18 0z" style={{ fill: accent }} />
        <path d="M18 9v18M9 18h18" stroke="var(--accent-ink)" strokeWidth="5" strokeLinecap="butt" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${204 + i * 8} ${30 + i * 14})`}>
          <rect width="96" height="62" rx="4" style={{ fill: "var(--paper)" }} stroke={ink} strokeOpacity="0.45" />
          <rect x="8" y="10" width="44" height="5" rx="2" style={{ fill: tone(55) }} />
          <rect x="8" y="22" width="64" height="4" rx="2" style={{ fill: tone(22) }} />
          <rect x="8" y="32" width="52" height="4" rx="2" style={{ fill: tone(22) }} />
          <rect x="8" y="44" width="42" height="10" rx="2" fill="none" stroke={ink} strokeOpacity="0.5" strokeDasharray="3 2" />
          <text x="12" y="52" fontSize="7.5" fontFamily="var(--font-plex), monospace" style={{ fill: tone(70) }}>
            simulasi
          </text>
        </g>
      ))}
    </Frame>
  );
}

function RajaAmpatCover() {
  return (
    <Frame>
      <g className="layer-far" style={{ fill: tone(16) }} stroke={ink} strokeOpacity="0.3">
        <path d="M0 96l40-34 24 18 34-40 32 36 22-14 26 34z" />
      </g>
      <g className="layer-mid" style={{ fill: tone(30) }} stroke={ink} strokeOpacity="0.4">
        <path d="M120 104l22-44 18 12 20-30 22 40 14-10 20 32z" />
        <path d="M190 104l18-26 14 10 12-18 14 30z" />
      </g>
      <g className="layer-near" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round">
        <path d="M0 112q20-12 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0" />
        <path d="M0 130q20-12 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0" style={{ stroke: tone(45) }} />
        <path d="M0 148q20-12 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0" style={{ stroke: tone(28) }} />
      </g>
      <g stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M30 180v-20M30 164l-8-8M30 168l8-10M52 180v-14M52 170l-6-6M52 172l7-8" />
      </g>
      <path d="M216 0v180" stroke={accent} strokeWidth="3" />
      <circle cx="216" cy="90" r="10" style={{ fill: accent }} />
      <path d="M212 90l-4-3v6zM220 90l4-3v6z" style={{ fill: "var(--accent-ink)" }} />
      <g stroke={ink} strokeOpacity="0.35" strokeWidth="1.5">
        <path d="M222 12l16 16M232 12l16 16M242 12l16 16M252 12l16 16M262 12l16 16M272 12l16 16M282 12l16 16M292 12l16 16" />
      </g>
    </Frame>
  );
}

function LmsCover() {
  const slabs: { b: Box3; tones: readonly [number, number, number]; label: string }[] = [
    { b: [3.6, 3.6, 3.6, 6.4, 6.4, 4.1], tones: [58, 40, 48], label: "Country" },
    { b: [2.8, 2.8, 2.4, 7.2, 7.2, 2.9], tones: [46, 30, 38], label: "Region" },
    { b: [2.0, 2.0, 1.2, 8.0, 8.0, 1.7], tones: [34, 22, 28], label: "City" },
    { b: [1.2, 1.2, 0, 8.8, 8.8, 0.5], tones: [22, 14, 18], label: "Store" },
  ];
  return (
    <Frame>
      <svg viewBox="150 140 340 270" x="30" y="-6" width="250" height="198">
        <g stroke={ink} strokeOpacity="0.4" strokeWidth="1" strokeLinejoin="round">
          {[...slabs].reverse().map((s) => (
            <Box key={s.label} b={s.b} tones={s.tones} />
          ))}
        </g>
      </svg>
      {slabs.map((s, i) => (
        <g key={s.label}>
          <path d={`M${222 + i * 6} ${46 + i * 30}h${46 - i * 6}`} stroke={ink} strokeOpacity="0.4" />
          <text x="272" y={50 + i * 30} fontSize="10" fontFamily="var(--font-plex), monospace" style={{ fill: i === 0 ? accent : tone(80) }}>
            {s.label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function EduPortalCover() {
  return (
    <Frame>
      {[
        { x: 18, y: 50, w: 70, h: 84, o: 0.55 },
        { x: 232, y: 50, w: 70, h: 84, o: 0.55 },
        { x: 82, y: 34, w: 156, h: 114, o: 1 },
      ].map((c) => (
        <g key={c.x} opacity={c.o}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="5" style={{ fill: "var(--paper)" }} stroke={ink} strokeOpacity="0.5" />
          <rect x={c.x + 8} y={c.y + 8} width={c.w - 16} height={c.h * 0.42} rx="3" style={{ fill: tone(c.o === 1 ? 20 : 12) }} />
          <rect x={c.x + 8} y={c.y + c.h * 0.42 + 18} width={c.w * 0.6} height="5" rx="2" style={{ fill: tone(55) }} />
          <rect x={c.x + 8} y={c.y + c.h * 0.42 + 30} width={c.w * 0.8} height="4" rx="2" style={{ fill: tone(22) }} />
        </g>
      ))}
      <g>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={140 + i * 14} cy="162" r="3.5" style={{ fill: i === 1 ? accent : tone(26) }} />
        ))}
      </g>
      <path d="M62 92l-9 6 9 6M258 92l9 6-9 6" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function WarkopCover() {
  return (
    <Frame>
      <ellipse cx="160" cy="150" rx="74" ry="11" style={{ fill: tone(18) }} />
      <path d="M118 62h84l-9 82q-1 8-9 8h-48q-8 0-9-8z" style={{ fill: "var(--paper)" }} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M123 96h74l-6 48q-1 6-8 6h-46q-7 0-8-6z" style={{ fill: tone(70) }} />
      <path d="M123 96h74" stroke={accent} strokeWidth="3" />
      <path d="M202 80q26 0 26 22t-26 22" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      <g className="steam" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6">
        <path d="M140 52q-8-10 0-20t0-20" />
        <path d="M162 50q-8-10 0-20t0-20" />
        <path d="M184 52q-8-10 0-20t0-20" />
      </g>
      <g fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 94l-10 8 10 8M290 94l10 8-10 8" />
      </g>
    </Frame>
  );
}

const covers = {
  loopa: LoopaCover,
  siagars: SiagaCover,
  "save-raja-ampat": RajaAmpatCover,
  "lms-hyper-optimum": LmsCover,
  "eduportal-sibermu": EduPortalCover,
  "warkop-setia-abadi": WarkopCover,
} as const;

export function ProjectCover({ slug, className = "" }: { slug: string; className?: string }) {
  const Cover = covers[slug as keyof typeof covers];
  if (!Cover) return null;
  return (
    <div className={`cover-box overflow-hidden rounded-sm border border-line ${className}`}>
      <Cover />
    </div>
  );
}
