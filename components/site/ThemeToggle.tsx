"use client";

import { useEffect } from "react";
import { useLang } from "@/components/i18n/useLang";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

function applyTheme(next: string) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Mode privat bisa menolak penyimpanan; tema tetap berubah untuk sesi ini.
  }
}

// Tema berganti dengan lingkaran yang melebar dari titik klik (View Transitions); tanpa dukungan, berganti langsung.
function toggleTheme(origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  const doc = document as ViewTransitionDocument;
  if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    applyTheme(next);
    return;
  }
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const transition = doc.startViewTransition(() => applyTheme(next));
  transition.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 800, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      ),
    )
    .catch(() => undefined);
}

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

// Dipasang sekali; ThemeToggle muncul lebih dari satu kali dan akan membatalkan dirinya sendiri.
export function ThemeShortcut() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "t" || e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return;
      toggleTheme();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}

export function ThemeToggle({ className = "tap icon-btn" }: { className?: string }) {
  const en = useLang() === "en";
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      className={className}
      aria-label={en ? "Switch between light and dark theme" : "Ganti tema terang atau gelap"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="dock-glyph h-6 w-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <g className="only-light">
          <path d="M20 14.5A8 8 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" strokeLinejoin="round" />
        </g>
        <g className="only-dark">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </g>
      </svg>
      <span className="dock-tip">{en ? "Switch theme (T)" : "Ganti tema (T)"}</span>
    </button>
  );
}
