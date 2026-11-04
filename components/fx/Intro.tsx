"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import { useLang } from "@/components/i18n/useLang";

type Phase = "build" | "whoop" | "exit" | "gone";

const rows = profile.name.split(" ");
const total = rows.join("").length;
const layout = rows.map((word, r) => ({ word, base: rows.slice(0, r).join("").length }));

// Posisi awal potongan: tersebar di layar, ditentukan tetap agar server dan klien sama.
const scatter = [
  [-42, -38, -40], [38, 40, 30], [-26, 44, -70], [44, -36, 55], [-46, 22, -25], [14, -44, 80],
  [40, 30, -55], [-38, -26, 35], [28, 46, -90], [-44, 40, 45], [46, -20, -30], [-16, 48, 65],
] as const;

const STEP_MS = 95;
const FIRST_MS = 350;
const SETTLE_MS = 800;

function piecePath(first: boolean, last: boolean) {
  const right = last ? "V100" : "V38 C112 34 124 40 122 50 C124 60 112 66 100 62 V100";
  const left = first ? "Z" : "V62 C12 66 24 60 22 50 C24 40 12 34 0 38 Z";
  return `M0 0 H100 ${right} H0 ${left}`;
}

const confetti = Array.from({ length: 30 }, (_, i) => ({
  angle: (i / 30) * 360 + (i % 3) * 7,
  dist: 9 + ((i * 7) % 5) * 3.4,
  size: 0.45 + ((i * 3) % 4) * 0.18,
  tone: i % 3,
}));

// Intro sebelum halaman utama: potongan puzzle nama menyatu, lalu "whoop" dan tirai terangkat. Tampil setiap kali halaman utama dimuat ulang.
export function Intro() {
  const home = usePathname() === "/";
  const en = useLang() === "en";
  const [phase, setPhase] = useState<Phase>("build");
  const [placed, setPlaced] = useState(0);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    document.documentElement.dataset.intro = "done";
    setPhase((p) => (p === "exit" || p === "gone" ? p : "exit"));
    timers.current.push(window.setTimeout(() => setPhase("gone"), 900));
  }, []);

  useEffect(() => {
    if (phase !== "build" || document.documentElement.dataset.intro !== "run") return;
    const t = timers.current;
    for (let i = 0; i < total; i += 1) t.push(window.setTimeout(() => setPlaced(i + 1), FIRST_MS + i * STEP_MS));
    t.push(window.setTimeout(() => setPhase("whoop"), FIRST_MS + (total - 1) * STEP_MS + SETTLE_MS));
    return () => {
      t.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "whoop") return;
    const id = window.setTimeout(finish, 1500);
    return () => window.clearTimeout(id);
  }, [phase, finish]);

  useEffect(() => {
    if (phase === "gone" || phase === "exit") return;
    const onKey = (e: KeyboardEvent) => (e.key === "Escape" || e.key === "Enter") && finish();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, finish]);

  if (!home || phase === "gone") return null;

  return (
    <div className="intro" data-phase={phase} role="status" aria-label={en ? `Loading ${profile.name}` : `Memuat ${profile.name}`}>
      <div className="intro-board" aria-hidden="true">
        {layout.map(({ word, base }) => (
          <div key={word} className="intro-row" style={{ "--n": word.length } as CSSProperties}>
            {word.split("").map((ch, k) => {
              const i = base + k;
              const [dx, dy, rot] = scatter[i % scatter.length] ?? [0, 0, 0];
              return (
                <span
                  key={`${word}-${k}`}
                  className="pz"
                  data-on={placed > i}
                  style={{ "--k": k, "--i": i, "--dx": dx, "--dy": dy, "--rot": `${rot}deg` } as CSSProperties}
                >
                  <svg viewBox="-3 -3 130 106" preserveAspectRatio="none" className="pz-svg" focusable="false">
                    <path d={piecePath(k === 0, k === word.length - 1)} />
                  </svg>
                  <b className="pz-ch">{ch}</b>
                </span>
              );
            })}
          </div>
        ))}
        <div className="intro-burst">
          {confetti.map((c, i) => (
            <i key={i} data-tone={c.tone} style={{ "--a": `${c.angle}deg`, "--d": `${c.dist}vmin`, "--z": `${c.size}rem` } as CSSProperties} />
          ))}
        </div>
        <p className="intro-whoop">whoop!</p>
      </div>
      <p className="intro-count mono" aria-hidden="true">
        {phase === "build" ? `${en ? "Assembling" : "Menyusun"} ${placed} / ${total}` : en ? "Complete" : "Lengkap"}
      </p>
      <button type="button" className="intro-skip mono" onClick={finish}>
        {en ? "Skip" : "Lewati"}
      </button>
    </div>
  );
}
