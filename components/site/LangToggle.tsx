"use client";

import { setLang } from "@/lib/i18n";
import { useLang } from "@/components/i18n/useLang";

// Saklar ID/EN di dock. Pilihan disimpan dan dipakai lagi di kunjungan berikutnya.
export function LangToggle() {
  const lang = useLang();
  const next = lang === "id" ? "en" : "id";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      className="dock-item lang-btn"
      data-lang-now={lang}
      aria-label={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
    >
      <span className="lang-track" aria-hidden="true">
        <span className="lang-opt" data-on={lang === "id"}>ID</span>
        <span className="lang-opt" data-on={lang === "en"}>EN</span>
      </span>
      <span className="dock-tip">{lang === "id" ? "English" : "Bahasa Indonesia"}</span>
    </button>
  );
}
