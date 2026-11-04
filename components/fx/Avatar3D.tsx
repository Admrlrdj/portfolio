"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useLang } from "@/components/i18n/useLang";

const SKIN = "#C99870";
const SKIN_DARK = "#B07E58";
const HAIR = "#14110F";
const HAIR_LIGHT = "#35302B";
const NAVY = "#1E3A78";
const NAVY_DARK = "#17306A";
const SHIRT = "#F5F5F3";

type Faces = { front?: ReactNode; back?: ReactNode; left?: ReactNode; right?: ReactNode; top?: ReactNode; bottom?: ReactNode };

type BoxProps = { w: number; h: number; d: number; x?: number; y?: number; z?: number; faces: Faces };

const face = (w: number, h: number, transform: string): CSSProperties => ({
  width: `${w}em`,
  height: `${h}em`,
  marginLeft: `${-w / 2}em`,
  marginTop: `${-h / 2}em`,
  transform,
});

function Box({ w, h, d, x = 0, y = 0, z = 0, faces }: BoxProps) {
  const slots: [keyof Faces, number, number, string][] = [
    ["front", w, h, `translateZ(${d / 2}em)`],
    ["back", w, h, `rotateY(180deg) translateZ(${d / 2}em)`],
    ["right", d, h, `rotateY(90deg) translateZ(${w / 2}em)`],
    ["left", d, h, `rotateY(-90deg) translateZ(${w / 2}em)`],
    ["top", w, d, `rotateX(90deg) translateZ(${h / 2}em)`],
    ["bottom", w, d, `rotateX(-90deg) translateZ(${h / 2}em)`],
  ];
  return (
    <div className="av-box" style={{ transform: `translate3d(${x}em, ${y}em, ${z}em)` }}>
      {slots.map(([name, fw, fh, t]) => (
        <div key={name} className="av-face" style={face(fw, fh, t)}>
          {faces[name]}
        </div>
      ))}
    </div>
  );
}

function Art({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w * 10} ${h * 10}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      {children}
    </svg>
  );
}

const flat = (color: string, w: number, h: number) => (
  <Art w={w} h={h}>
    <rect width={w * 10} height={h * 10} fill={color} />
  </Art>
);

function HeadFront() {
  return (
    <Art w={10.4} h={12.2}>
      <rect width="104" height="122" fill={SKIN} />
      <path d="M0 96Q10 120 52 122 94 120 104 96V122H0Z" fill={SKIN_DARK} opacity="0.5" />
      <ellipse cx="18" cy="82" rx="9" ry="6" fill="#C0775A" opacity="0.25" />
      <ellipse cx="86" cy="82" rx="9" ry="6" fill="#C0775A" opacity="0.25" />
      <path d="M0 0H104V30L97 26 90 38 78 24 66 36 56 22 46 34 34 24 24 36 14 26 8 40 0 34Z" fill={HAIR} />
      <path d="M0 30Q4 44 8 54V30ZM104 30Q100 44 96 54V30Z" fill={HAIR} />
      <g stroke={HAIR} strokeWidth="4.5" strokeLinecap="round">
        <path className="av-brow av-brow-l" d="M16 47L40 44" />
        <path className="av-brow av-brow-r" d="M64 44L88 47" />
      </g>
      <g className="av-look">
        <g className="av-eye av-eye-l">
          <ellipse cx="31" cy="61" rx="3.4" ry="2.8" fill="#1A1412" />
          <circle cx="32.4" cy="60" r="1" fill="#fff" />
        </g>
        <g className="av-eye av-eye-r">
          <ellipse cx="73" cy="61" rx="3.4" ry="2.8" fill="#1A1412" />
          <circle cx="74.4" cy="60" r="1" fill="#fff" />
        </g>
      </g>
      <path className="av-wink" d="M25 62Q31 66 37 62" fill="none" stroke="#1A1412" strokeWidth="2.4" strokeLinecap="round" />
      <g className="av-spirals" fill="none" stroke="#1A1412" strokeWidth="1.6" strokeLinecap="round">
        {[31, 73].map((cx) => (
          <g key={cx} transform={`translate(${cx} 61)`}>
            <path className="av-spiral" d="M0 0a1.2 1.2 0 0 1 2.4 0 2.4 2.4 0 0 1-4.8 0 3.6 3.6 0 0 1 7.2 0 4.8 4.8 0 0 1-9.6 0 6 6 0 0 1 12 0" />
          </g>
        ))}
      </g>
      <g fill="rgba(255,255,255,0.14)" stroke="#2A2623" strokeWidth="2.2">
        <circle cx="31" cy="60" r="14" />
        <circle cx="73" cy="60" r="14" />
      </g>
      <path d="M45 58Q52 54 59 58M17 56L0 52M87 56L104 52" fill="none" stroke="#2A2623" strokeWidth="2" />
      <path d="M52 66Q49 82 45 84 52 89 59 84 55 82 52 66" fill="none" stroke="#A8714E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path className="av-m m-smile" d="M32 96Q52 116 72 96 52 102 32 96Z" fill="#fff" stroke="#8A4A3A" strokeWidth="2.2" strokeLinejoin="round" />
      <g className="av-m m-laugh" strokeLinejoin="round">
        <path d="M30 93Q52 124 74 93Z" fill="#6B2A22" stroke="#8A4A3A" strokeWidth="2.2" />
        <path d="M33 94H71Q70 99 66 100H38Q34 99 33 94Z" fill="#fff" />
        <ellipse cx="52" cy="110" rx="9" ry="4.5" fill="#D8746A" />
      </g>
      <ellipse className="av-m m-o" cx="52" cy="102" rx="6" ry="8" fill="#6B2A22" stroke="#8A4A3A" strokeWidth="2.2" />
      <path className="av-m m-smirk" d="M38 100Q56 108 71 94" fill="none" stroke="#8A4A3A" strokeWidth="2.6" strokeLinecap="round" />
      <path className="av-m m-wavy" d="M34 101l6-5 6 5 6-5 6 5 6-5 6 5" fill="none" stroke="#8A4A3A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </Art>
  );
}

function HeadSide({ back }: { back: "left" | "right" }) {
  return (
    <Art w={10.4} h={12.2}>
      <g transform={back === "left" ? "translate(104 0) scale(-1 1)" : undefined}>
        <rect width="104" height="122" fill={SKIN} />
        <path d="M0 0H104V76L72 62 60 40 0 34Z" fill={HAIR} />
        <path d="M0 56L40 56" stroke="#2A2623" strokeWidth="2" />
        <ellipse cx="58" cy="66" rx="13" ry="19" fill={SKIN_DARK} />
        <path d="M54 54Q66 60 62 74" fill="none" stroke="#8F6240" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </Art>
  );
}

function HeadTop() {
  return (
    <Art w={10.4} h={10.4}>
      <rect width="104" height="104" fill={HAIR} />
      <g fill="none" stroke={HAIR_LIGHT} strokeWidth="3" strokeLinecap="round">
        <path d="M14 78Q40 40 92 48M20 58Q46 26 90 30M30 90Q60 60 98 70" />
      </g>
    </Art>
  );
}

function HeadBack() {
  return (
    <Art w={10.4} h={12.2}>
      <rect width="104" height="122" fill={SKIN} />
      <path d="M0 0H104V82Q52 98 0 82Z" fill={HAIR} />
    </Art>
  );
}

function TorsoFront() {
  return (
    <Art w={18} h={14}>
      <rect width="180" height="140" fill={NAVY} />
      <path d="M70 0H110L90 62Z" fill={SHIRT} />
      <path d="M62 0H76L90 32 70 22Z" fill="#fff" stroke="#D9D9D6" />
      <path d="M118 0H104L90 32 110 22Z" fill="#fff" stroke="#D9D9D6" />
      <path d="M52 0H66L90 68 80 100 44 28Z" fill={NAVY_DARK} />
      <path d="M128 0H114L90 68 100 100 136 28Z" fill={NAVY_DARK} />
      <circle cx="90" cy="114" r="4.5" fill="#C9A23C" />
      <path d="M120 58H156" stroke={NAVY_DARK} strokeWidth="2" />
      <circle cx="138" cy="92" r="14" fill={NAVY} stroke="#fff" strokeWidth="2" />
      <path d="M138 83Q132 88 132 94T138 101 144 94 138 83Z" fill="#fff" />
    </Art>
  );
}

type Mood = "idle" | "happy" | "surprised" | "wink" | "brow" | "dizzy";

// Pusing: diputar bolak-balik minimal REVERSALS kali dalam WINDOW_MS, tiap ayunan minimal SWING_PX.
const REVERSALS = 4;
const WINDOW_MS = 2600;
const SWING_PX = 22;
const DIZZY_MS = 3400;

export function Avatar3D() {
  const lang = useLang();
  const root = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; base: number; startX: number; lastX: number; lastT: number; dir: number; swing: number; flips: number[] } | null>(null);
  const turn = useRef(0);
  const hovering = useRef(false);
  const dizzyUntil = useRef(0);
  const timers = useRef<number[]>([]);

  const setMood = (m: Mood) => {
    const el = root.current;
    if (!el) return;
    if (m !== "dizzy" && performance.now() < dizzyUntil.current) return;
    el.dataset.mood = m;
  };
  const restMood = (): Mood => (hovering.current ? "happy" : "idle");
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  useEffect(() => {
    const el = root.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const list = timers.current;
    if (!el || calm) return;

    // Mimik iseng saat diam: kedip sebelah atau alis naik, sesekali.
    const idle = window.setInterval(() => {
      if (drag.current || el.dataset.mood !== "idle") return;
      const m: Mood = Math.random() < 0.5 ? "wink" : "brow";
      el.dataset.mood = m;
      later(() => el.dataset.mood === m && (el.dataset.mood = "idle"), 1100);
    }, 6500);

    const onMove = (e: PointerEvent) => {
      if (drag.current) return;
      el.style.setProperty("--vx", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
      el.style.setProperty("--vy", ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.clearInterval(idle);
      list.forEach(window.clearTimeout);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const goDizzy = () => {
    const el = root.current;
    if (!el || performance.now() < dizzyUntil.current) return;
    dizzyUntil.current = performance.now() + DIZZY_MS;
    el.dataset.dizzy = "true";
    el.dataset.mood = "dizzy";
    later(() => {
      el.dataset.dizzy = "false";
      el.dataset.mood = drag.current ? "surprised" : restMood();
    }, DIZZY_MS);
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, base: turn.current, startX: e.clientX, lastX: e.clientX, lastT: performance.now(), dir: 0, swing: 0, flips: [] };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.dataset.drag = "true";
    setMood("surprised");
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    turn.current = d.base + (e.clientX - d.x) * 0.6;
    const el = root.current;
    el?.style.setProperty("--turn", `${turn.current.toFixed(1)}deg`);

    // Tangan ikut terayun sesuai kecepatan putaran.
    const now = performance.now();
    const dx = e.clientX - d.lastX;
    const v = dx / Math.max(1, now - d.lastT);
    el?.style.setProperty("--fling", Math.max(-1, Math.min(1, v * 0.6)).toFixed(3));
    d.lastX = e.clientX;
    d.lastT = now;

    if (Math.abs(dx) < 1) return;
    const dir = Math.sign(dx);
    if (dir === d.dir) {
      d.swing += Math.abs(dx);
      return;
    }
    if (d.dir !== 0 && d.swing >= SWING_PX) {
      d.flips = [...d.flips.filter((t) => now - t < WINDOW_MS), now];
      if (d.flips.length >= REVERSALS) {
        d.flips = [];
        goDizzy();
      }
    }
    d.dir = dir;
    d.swing = Math.abs(dx);
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const tapped = d ? Math.abs(e.clientX - d.startX) < 5 : false;
    drag.current = null;
    turn.current = 0;
    e.currentTarget.dataset.drag = "false";
    const el = root.current;
    el?.style.setProperty("--turn", "0deg");
    el?.style.setProperty("--fling", "0");
    setMood(restMood());
    // Ketukan tanpa menyeret: melambaikan tangan.
    if (tapped && el && performance.now() >= dizzyUntil.current) {
      el.dataset.wave = "true";
      setMood("happy");
      later(() => {
        el.dataset.wave = "false";
        setMood(restMood());
      }, 1500);
    }
  };

  const arm = (side: -1 | 1) => (
    <div className={`av-arm ${side < 0 ? "av-arm-l" : "av-arm-r"}`}>
      <Box w={4.4} h={13} d={5} x={11.2 * side} y={4.2} faces={{ front: flat(NAVY, 4.4, 13), back: flat(NAVY, 4.4, 13), left: flat(NAVY_DARK, 5, 13), right: flat(NAVY_DARK, 5, 13), top: flat(NAVY, 4.4, 5), bottom: flat(NAVY_DARK, 4.4, 5) }} />
      <Box w={3.6} h={3} d={3.6} x={11.2 * side} y={12.2} faces={{ front: flat(SKIN, 3.6, 3), back: flat(SKIN, 3.6, 3), left: flat(SKIN_DARK, 3.6, 3), right: flat(SKIN_DARK, 3.6, 3), top: flat(SKIN, 3.6, 3.6), bottom: flat(SKIN_DARK, 3.6, 3.6) }} />
    </div>
  );

  return (
    <div
      ref={root}
      role="img"
      aria-label={
        lang === "en"
          ? "3D character of Radja Admiral: black hair, round glasses, navy IPB blazer. Drag to rotate; spin it back and forth and he gets dizzy."
          : "Model 3D karakter Radja Admiral: rambut hitam, kacamata bulat, blazer navy IPB. Bisa diputar dengan menyeret; diputar bolak-balik ia jadi pusing."
      }
      data-mood="idle"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        hovering.current = true;
        if (!drag.current) setMood("happy");
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        hovering.current = false;
        if (!drag.current) setMood("idle");
      }}
      className="av"
    >
      <div className="av-stage">
        <div className="av-shadow" />
        <div className="av-stars" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ "--i": i } as CSSProperties}>
              ★
            </span>
          ))}
        </div>
        <div className="av-body">
          <Box w={18} h={14} d={8} y={3.6} faces={{ front: <TorsoFront />, back: flat(NAVY, 18, 14), left: flat(NAVY_DARK, 8, 14), right: flat(NAVY_DARK, 8, 14), top: flat(NAVY, 18, 8), bottom: flat(NAVY_DARK, 18, 8) }} />
          {arm(-1)}
          {arm(1)}
          <Box w={3.8} h={2.4} d={3.8} y={-4.6} faces={{ front: flat(SKIN_DARK, 3.8, 2.4), back: flat(SKIN_DARK, 3.8, 2.4), left: flat(SKIN_DARK, 3.8, 2.4), right: flat(SKIN_DARK, 3.8, 2.4), top: flat(SKIN_DARK, 3.8, 3.8), bottom: flat(SKIN_DARK, 3.8, 3.8) }} />
          <div className="av-head">
            <div className="av-head-wobble">
              <Box w={10.4} h={12.2} d={10.4} y={-12} faces={{ front: <HeadFront />, back: <HeadBack />, left: <HeadSide back="left" />, right: <HeadSide back="right" />, top: <HeadTop />, bottom: flat(SKIN_DARK, 10.4, 10.4) }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
