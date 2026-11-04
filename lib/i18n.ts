// Teks dua bahasa. Bahasa aktif disimpan di <html data-lang> dan localStorage "lang"; bawaannya Indonesia.
export type Lang = "id" | "en";
export type Bi = { id: string; en: string };

export const bi = (id: string, en: string): Bi => ({ id, en });

export function pick(v: Bi, lang: Lang): string {
  return v[lang];
}

export function readLang(): Lang {
  return typeof document !== "undefined" && document.documentElement.dataset.lang === "en" ? "en" : "id";
}

export function setLang(lang: Lang) {
  const root = document.documentElement;
  root.dataset.lang = lang;
  root.lang = lang;
  try {
    localStorage.setItem("lang", lang);
  } catch {
    // mode privat: bahasa tetap berganti untuk sesi ini
  }
}

/** Skrip sebelum cat pertama agar bahasa tersimpan tidak berkedip. */
export const langScript = `try{var l=localStorage.getItem("lang");if(l==="en"||l==="id"){document.documentElement.dataset.lang=l;document.documentElement.lang=l}}catch(e){}`;
