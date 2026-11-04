"use client";

import { useSyncExternalStore } from "react";
import { readLang, type Bi, type Lang } from "@/lib/i18n";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
  return () => observer.disconnect();
}

// Untuk teks yang tidak bisa dirender ganda: aria-label, title, teks yang diketik, format tanggal.
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, readLang, () => "id");
}

export function useT() {
  const lang = useLang();
  return (v: Bi | { id: string; en: string }) => v[lang];
}
