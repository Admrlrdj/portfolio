"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/components/i18n/useLang";

type Line = { id: string; en: string };

// Dua kalimat pertama selalu tampil berurutan, sisanya diacak.
const opening: Line[] = [
  { id: "Halo semuanya! 👋", en: "Hi everyone! 👋" },
  {
    id: "Aku Radja Admiral. Panggil Radja boleh, Admieral juga boleh, tapi yang kedua kurang profesional sih, no cap.",
    en: "I'm Radja Admiral. Call me Radja, or Admieral, but the second one is kinda unprofessional ngl.",
  },
];

const pool: Line[] = [
  { id: "Radiohead till I die. 🎧", en: "Radiohead till I die. 🎧" },
  { id: "Nanya lagu favorit? Siap-siap dengerin ceramah soal In Rainbows.", en: "Ask me my favorite album and get ready for a whole lecture on In Rainbows." },
  { id: "Ngoding paling enak ditemani In Rainbows dari awal sampai habis.", en: "Best coding soundtrack? In Rainbows, start to finish." },
  { id: "“Talk is cheap. Show me the code.” — Linus Torvalds", en: "“Talk is cheap. Show me the code.” — Linus Torvalds" },
  { id: "“Pecahkan masalahnya dulu, baru tulis kodenya.” — John Johnson", en: "“First, solve the problem. Then, write the code.” — John Johnson" },
  { id: "“Kesederhanaan adalah syarat keandalan.” — Edsger Dijkstra", en: "“Simplicity is prerequisite for reliability.” — Edsger Dijkstra" },
  { id: "“Bikin jalan dulu, lalu bikin benar, lalu bikin cepat.” — Kent Beck", en: "“Make it work, make it right, make it fast.” — Kent Beck" },
  { id: "Di laptopku jalan kok. Beneran. 🤞", en: "It works on my machine. I swear. 🤞" },
  { id: "Kopi dulu, baru deploy. ☕", en: "Coffee first, deploy later. ☕" },
  { id: "Lagi cari magang 2027. Lagi buka lowongan? 👀", en: "Looking for a 2027 internship. Hiring? 👀" },
  { id: "Coba putar aku bolak-balik... eh jangan deh, nanti pusing.", en: "Try spinning me back and forth... actually don't, I get dizzy." },
  { id: "Klik background-nya deh, ada kejutan kecil.", en: "Click the background. Small surprise." },
  { id: "Commit message favorit: “fix”, “fix lagi”, “fix beneran”.", en: "Favorite commit messages: “fix”, “fix again”, “actually fix”." },
];

const reactions: Record<string, Line> = {
  dizzy: { id: "Pusiiing... dunianya muter 😵‍💫", en: "Whoa... the room is spinning 😵‍💫" },
  wave: { id: "Hai juga! 👋", en: "Hey there! 👋" },
};

const HOLD_MS = 5200;
const TYPE_MS = 28;

function shuffled<T>(list: T[]) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}

// Balon kata di atas avatar 3D. Berganti sendiri; klik untuk kalimat berikutnya. Bereaksi saat avatar pusing atau melambai.
export function SpeechBubble() {
  const lang = useLang();
  const queue = useRef<Line[]>(opening);
  const pos = useRef(0);
  const [line, setLine] = useState<Line>(opening[0] as Line);
  const [shown, setShown] = useState(0);
  const [tick, setTick] = useState(0);
  const calm = useRef(false);
  const holdUntil = useRef(0);

  const next = useCallback(() => {
    pos.current += 1;
    if (pos.current >= queue.current.length) {
      queue.current = shuffled(pool);
      pos.current = 0;
    }
    setLine(queue.current[pos.current] as Line);
    setTick((t) => t + 1);
  }, []);

  const text = line[lang];

  // Efek mengetik.
  useEffect(() => {
    calm.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm.current) {
      setShown(text.length);
      return;
    }
    setShown(0);
    let i = 0;
    const chars = [...text];
    const id = window.setInterval(() => {
      i += 1;
      setShown(chars.slice(0, i).join("").length);
      if (i >= chars.length) window.clearInterval(id);
    }, TYPE_MS);
    return () => window.clearInterval(id);
  }, [text, tick]);

  // Ganti kalimat otomatis setelah selesai diketik.
  useEffect(() => {
    if (shown < text.length) return;
    const wait = Math.max(HOLD_MS, holdUntil.current - performance.now());
    const id = window.setTimeout(next, wait);
    return () => window.clearTimeout(id);
  }, [shown, text, next]);

  // Reaksi dari avatar.
  useEffect(() => {
    const on = (e: Event) => {
      const r = reactions[(e as CustomEvent<string>).detail];
      if (!r) return;
      holdUntil.current = performance.now() + 3200;
      setLine(r);
      setTick((t) => t + 1);
    };
    window.addEventListener("avatar:react", on);
    return () => window.removeEventListener("avatar:react", on);
  }, []);

  return (
    <button
      type="button"
      onClick={next}
      className="bubble"
      aria-label={lang === "en" ? `Radja says: ${text}. Click for the next line.` : `Radja berkata: ${text}. Klik untuk kalimat berikutnya.`}
    >
      <span key={tick} className="bubble-in" aria-hidden="true">
        {text.slice(0, shown)}
        <span className="bubble-ghost">{text.slice(shown)}</span>
      </span>
    </button>
  );
}
