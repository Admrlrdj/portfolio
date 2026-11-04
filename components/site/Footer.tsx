"use client";

import { useEffect, useRef, useState } from "react";
import { cv, nav, profile } from "@/content/profile";
import { siInstagram } from "simple-icons";
import { Glyph } from "@/components/ui/Glyph";
import { TechIcon } from "@/components/ui/TechIcon";
import { scrollToHash } from "@/lib/scroll";
import { useLang } from "@/components/i18n/useLang";

const REACH = 150;
const letters = profile.name.split("").map((ch, i, all) => ({ ch, i, idx: all.slice(0, i).filter((c) => c !== " ").length }));
const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Spline", "Lenis"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  const [since] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const tick = () => {
      setNow(new Date());
      setElapsed(Math.floor((Date.now() - since) / 1000));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [since]);
  return { now, elapsed };
}

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const chars = useRef<HTMLSpanElement[]>([]);
  const [inView, setInView] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pct, setPct] = useState(0);
  const { now, elapsed } = useClock();
  const lang = useLang();
  const en = lang === "en";
  const locale = en ? "en-GB" : "id-ID";

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setInView(true), { threshold: 0.15 });
    io.observe(el);
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setPct(Math.round((window.scrollY / max) * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const wave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    chars.current.forEach((el) => {
      const r = el.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      el.style.setProperty("--k", Math.max(0, 1 - d / REACH).toFixed(3));
    });
  };
  const calm = () => chars.current.forEach((el) => el.style.setProperty("--k", "0"));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const top = () => {
    if (document.getElementById("beranda")) scrollToHash("#beranda");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const time = now
    ? new Intl.DateTimeFormat(locale, { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now).replace(/\./g, ":")
    : "--:--:--";
  const date = now
    ? new Intl.DateTimeFormat(locale, { timeZone: "Asia/Jakarta", weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now)
    : "";
  const hour = now ? Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", hour12: false }).format(now)) : 12;
  const part = hour >= 5 && hour < 11 ? 0 : hour < 15 ? 1 : hour < 18 ? 2 : 3;
  const greeting = en
    ? `${["Good morning", "Good afternoon", "Good afternoon", "Good evening"][part]} from East Jakarta. Thanks for stopping by.`
    : `${["Pagi", "Siang", "Sore", "Malam"][part]} dari Jakarta Timur. Terima kasih sudah mampir.`;

  return (
    <footer ref={root} data-in={inView} className="foot">
      <div className="wrap">
        <div className="foot-top">
          <p className="mono foot-hello">
            <span className="foot-live" aria-hidden="true" />
            {greeting}
          </p>
          <button type="button" onClick={top} className="foot-up" aria-label={en ? "Back to top" : "Kembali ke atas"}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            <span className="mono">{pct}%</span>
          </button>
        </div>

        <div className="foot-word" onPointerMove={wave} onPointerLeave={calm} aria-label={profile.name} role="img">
          {letters.map(({ ch, i, idx }) => {
            return ch === " " ? (
              <span key={`s${i}`} className="foot-gap" aria-hidden="true" />
            ) : (
              <span
                key={`${ch}${i}`}
                ref={(el) => {
                  if (el) chars.current[idx] = el;
                }}
                aria-hidden="true"
                className="fw-char"
                style={{ "--d": `${idx * 38}ms` } as React.CSSProperties}
              >
                <span>{ch}</span>
              </span>
            );
          })}
        </div>

        <div className="foot-grid">
          <div>
            <h2 className="foot-h">{en ? "Explore" : "Jelajah"}</h2>
            <ul className="foot-list">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={`/${item.href}`} className="foot-link">
                    {item.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="foot-h">{en ? "Find me" : "Temukan saya"}</h2>
            <ul className="foot-list">
              <li>
                <button type="button" onClick={copyEmail} className="foot-link">
                  {copied ? (en ? "Email copied" : "Email tersalin") : profile.email}
                  <Glyph kind={copied ? "check" : "copy"} className="h-4 w-4" />
                </button>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="foot-link">
                  GitHub <Glyph kind="external" className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="foot-link">
                  LinkedIn <Glyph kind="external" className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="foot-link">
                  <TechIcon icon={siInstagram} className="h-4 w-4" /> Instagram @rdjadmrl
                </a>
              </li>
              <li>
                <a href="/cv" className="foot-link">
                  {en ? "View Curriculum Vitae" : "Lihat Curriculum Vitae"} <Glyph kind="cv" className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a href={cv.file[lang]} download={cv.fileName[lang]} className="foot-link">
                  {en ? "Download Curriculum Vitae (PDF, English)" : "Unduh Curriculum Vitae (PDF, Indonesia)"} <Glyph kind="download" className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="foot-h">Info</h2>
            <dl className="foot-info mono">
              <div>
                <dt>{en ? "Time in East Jakarta" : "Waktu di Jakarta Timur"}</dt>
                <dd className="foot-clock" suppressHydrationWarning>
                  {time} WIB
                </dd>
                <dd className="foot-sub" suppressHydrationWarning>
                  {date}
                </dd>
              </div>
              <div>
                <dt>{en ? "Time on this site" : "Lama di situs ini"}</dt>
                <dd suppressHydrationWarning>
                  {pad(Math.floor(elapsed / 60))}:{pad(elapsed % 60)}
                </dd>
              </div>
              <div>
                <dt>{en ? "Built with" : "Dibangun dengan"}</dt>
                <dd>
                  <ul className="foot-stack">
                    {stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="foot-base mono">
          <p>
            © 2026 {profile.name}, IPB University.
          </p>
          <p className="hidden md:block">
            {en ? "Press" : "Tekan"} <kbd>T</kbd> {en ? "to switch theme" : "untuk ganti tema"}
          </p>
        </div>
      </div>
    </footer>
  );
}
