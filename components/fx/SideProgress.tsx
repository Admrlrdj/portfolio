"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/i18n/useLang";

const sections = [
  { id: "beranda", label: "Beranda", en: "Home" },
  { id: "kamar", label: "Kamar", en: "Room" },
  { id: "proyek", label: "Proyek", en: "Projects" },
  { id: "pengalaman", label: "Pengalaman", en: "Experience" },
  { id: "keahlian", label: "Keahlian", en: "Skills" },
  { id: "pendidikan", label: "Pendidikan", en: "Education" },
  { id: "kontak", label: "Kontak", en: "Contact" },
];

type Mark = { id: string; label: string; en: string; pos: number };

// Pengganti scrollbar bawaan: garis di sisi kanan yang terisi sesuai posisi, dengan titik per bagian.
export function SideProgress() {
  const fill = useRef<HTMLSpanElement>(null);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const lang = useLang();

  useEffect(() => {
    const read = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const found = sections.flatMap((s) => {
        const el = document.getElementById(s.id);
        return el ? [{ ...s, pos: Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY) / max)) }] : [];
      });
      setMarks(found);
    };
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      const probe = window.scrollY + window.innerHeight * 0.4;
      let current = "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) current = s.id;
      }
      setActive(current);
    };
    read();
    update();
    const ro = new ResizeObserver(() => {
      read();
      update();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", read);
    };
  }, [pathname]);

  return (
    <nav aria-label={lang === "en" ? "Page position" : "Posisi halaman"} className="side-progress">
      <span className="side-track" aria-hidden="true">
        <span ref={fill} className="side-fill" />
      </span>
      {marks.map((m) => (
        <a key={m.id} href={`#${m.id}`} className="side-dot" data-active={active === m.id} style={{ top: `${m.pos * 100}%` }} aria-label={lang === "en" ? m.en : m.label}>
          <span className="side-label">{lang === "en" ? m.en : m.label}</span>
        </a>
      ))}
    </nav>
  );
}
