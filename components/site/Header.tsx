"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { nav } from "@/content/profile";
import { IsoIcon, type IsoKind } from "@/components/ui/IsoIcon";
import { ThemeShortcut, ThemeToggle } from "./ThemeToggle";
import { useLang } from "@/components/i18n/useLang";
import { LangToggle } from "./LangToggle";

// Sudut kamar: lantai dan dua dinding, sama bahasa visualnya dengan benda-benda isometrik lain.
function RoomIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={`dock-glyph ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <path d="M16 18 5 12v-8l11 6z" fill="currentColor" fillOpacity="0.22" />
      <path d="M16 18 27 12v-8l-11 6z" fill="currentColor" fillOpacity="0.1" />
      <path d="M5 12l11 6 11-6M16 18v10M5 12v10l11 6 11-6V12" />
    </svg>
  );
}

const icons: Record<string, IsoKind | "room"> = {
  "#kamar": "room",
  "#proyek": "monitor",
  "#pengalaman": "calendar",
  "#keahlian": "books",
  "#pendidikan": "frame",
  "#kontak": "phone",
};

const MAGNIFY = 0.5;
const REACH = 96;

export function Header() {
  const [rawActive, setActive] = useState<string | null>(null);
  const [blob, setBlob] = useState<{ x: number; w: number } | null>(null);
  const dock = useRef<HTMLDivElement>(null);
  const onHome = usePathname() === "/";
  const lang = useLang();
  const active = onHome ? rawActive : null;

  // Bagian yang melewati tengah layar dianggap aktif.
  useEffect(() => {
    if (!onHome) return;
    const targets = nav.map((item) => document.querySelector(item.href)).filter((el): el is Element => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    const top = new IntersectionObserver(([e]) => e?.isIntersecting && setActive(null), { rootMargin: "0px 0px -60% 0px" });
    const hero = document.getElementById("beranda");
    if (hero) top.observe(hero);
    return () => {
      observer.disconnect();
      top.disconnect();
    };
  }, [onHome]);

  const place = useCallback(() => {
    const el = active ? dock.current?.querySelector<HTMLElement>(`[data-key="${active}"]`) : null;
    setBlob(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [active]);

  useLayoutEffect(() => {
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [place]);

  // Efek dock: ikon yang dekat kursor membesar, yang jauh tetap. Hanya untuk mouse.
  const magnify = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    dock.current?.querySelectorAll<HTMLElement>(".dock-item").forEach((el) => {
      const r = el.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      const k = Math.max(0, 1 - d / REACH);
      el.style.setProperty("--s", (1 + MAGNIFY * k * k).toFixed(3));
    });
  };
  const reset = () => dock.current?.querySelectorAll<HTMLElement>(".dock-item").forEach((el) => el.style.setProperty("--s", "1"));

  return (
    <header className="dock-wrap">
      <ThemeShortcut />
      <div ref={dock} className="dock" onPointerMove={magnify} onPointerLeave={reset}>
        <span aria-hidden="true" className="dock-blob" style={blob ? { transform: `translateX(${blob.x}px)`, width: blob.w, opacity: 1 } : undefined} />
        <Link href="/" className="dock-item dock-logo" aria-label={lang === "en" ? "Radja Admiral, go home" : "Radja Admiral, ke beranda"}>
          <span className="dock-mono">RA</span>
          <span className="dock-tip">{lang === "en" ? "Home" : "Beranda"}</span>
        </Link>
        <span aria-hidden="true" className="dock-sep" />
        <nav aria-label={lang === "en" ? "Main" : "Utama"} className="contents">
          {nav.map((item) => {
            const kind = icons[item.href] ?? "monitor";
            return (
              <a
                key={item.href}
                data-key={item.href}
                href={`/${item.href}`}
                aria-label={item.label[lang]}
                aria-current={onHome && active === item.href ? "location" : undefined}
                data-active={onHome && active === item.href}
                className="dock-item"
              >
                {kind === "room" ? <RoomIcon /> : <IsoIcon kind={kind} className="dock-glyph h-7 w-7" />}
                <span className="dock-tip">{item.label[lang]}</span>
              </a>
            );
          })}
        </nav>
        <span aria-hidden="true" className="dock-sep" />
        <Link href="/cv" className="dock-item dock-cv" aria-label={lang === "en" ? "View CV" : "Lihat CV"}>
          <IsoIcon kind="paper" className="dock-glyph h-7 w-7" />
          <span className="dock-tip">{lang === "en" ? "View CV" : "Lihat CV"}</span>
        </Link>
        <ThemeToggle className="dock-item" />
        <LangToggle />
      </div>
    </header>
  );
}
