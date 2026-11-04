"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { Glyph } from "@/components/ui/Glyph";
import { useLang } from "@/components/i18n/useLang";
import type { Lang } from "@/lib/i18n";

type Kind = "kw" | "p" | "str" | "com" | "key" | "id";
type Token = { k: Kind; s: string; href?: string; tip?: string };

const github = profile.github.replace("https://", "");
const instagram = "@rdjadmrl";
const linkedin = profile.linkedin.replace("https://www.", "").replace(/\/$/, "");

const p = (s: string): Token => ({ k: "p", s });
const str = (s: string, href?: string, tip?: string): Token => ({ k: "str", s: `"${s}"`, href, tip });

// Isi editor sebagai token supaya bisa diketik bertahap, disorot, dan diberi petunjuk saat di-hover.
// Dibuat untuk tiap bahasa; nama file dan kunci ikut berganti.
function build(lang: Lang) {
  const en = lang === "en";
  const file = en ? "contact.ts" : "kontak.ts";
  const newTab = en ? "Opens in a new tab" : "Buka di tab baru";
  const langKey = en ? "languages" : "bahasa";
  const lines: Token[][] = [
    [{ k: "kw", s: "const", tip: en ? "const radja: Contact" : "const radja: Kontak" }, { k: "id", s: " radja " }, p("= {")],
    [{ k: "id", s: "  " }, { k: "key", s: "email", tip: "(property) email: string" }, p(": "), str(profile.email, `mailto:${profile.email}`, en ? "Click to write an email" : "Klik untuk menulis email"), p(",")],
    [{ k: "id", s: "  " }, { k: "key", s: "github", tip: "(property) github: string" }, p(": "), str(github, profile.github, newTab), p(",")],
    [{ k: "id", s: "  " }, { k: "key", s: "linkedin", tip: "(property) linkedin: string" }, p(": "), str(linkedin, profile.linkedin, newTab), p(",")],
    [{ k: "id", s: "  " }, { k: "key", s: "instagram", tip: "(property) instagram: string" }, p(": "), str(instagram, profile.instagram, newTab), p(",")],
    [{ k: "id", s: "  " }, { k: "key", s: langKey, tip: `(property) ${langKey}: string[]` }, p(": ["), str(en ? "English" : "Indonesia"), p(", "), str(en ? "Indonesian" : "English"), p("],")],
    [p("};")],
    [{ k: "com", s: en ? "// click a line to place the cursor, or press Run" : "// klik baris untuk menaruh kursor, atau tekan Jalankan" }],
    [{ k: "kw", s: "export default" }, { k: "id", s: " radja" }, p(";")],
  ];
  let acc = 0;
  // Awal tiap token dalam hitungan karakter global, dipakai untuk mengetik bertahap.
  const laid = lines.map((line) =>
    line.map((t) => {
      const start = acc;
      acc += t.s.length;
      return { t, start };
    }),
  );
  const output = [
    { t: "cmd", s: `npx tsx ${file}` },
    { t: "ok", s: en ? `${file} loaded` : `${file} dibaca` },
    { t: "log", s: `{ email: '${profile.email}',` },
    { t: "log", s: `  github: '${github}',` },
    { t: "log", s: `  linkedin: '${linkedin}',` },
    { t: "log", s: `  instagram: '${instagram}' }` },
    { t: "ok", s: en ? "Ready to talk. I usually reply within a day or two." : "Siap dihubungi. Balasan biasanya dalam satu-dua hari." },
  ];
  return { file, lines, laid, total: acc, output };
}

const packs = { id: build("id"), en: build("en") };
const lineLength = (l: Token[]) => l.reduce((a, t) => a + t.s.length, 0);

function Rendered({ token, shown, caret }: { token: Token; shown: number; caret: boolean }) {
  const seen = token.s.slice(0, shown);
  const ghost = token.s.slice(shown);
  const body = (
    <>
      {seen}
      {caret && <span className="caret" aria-hidden="true" />}
      {ghost && <span className="ghost">{ghost}</span>}
    </>
  );
  const cls = `tk c-${token.k}`;
  if (token.href && !ghost) {
    const external = token.href.startsWith("http");
    return (
      <a href={token.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={cls} data-tip={token.tip}>
        {body}
      </a>
    );
  }
  return (
    <span className={cls} data-tip={token.tip && !ghost ? token.tip : undefined}>
      {body}
    </span>
  );
}

export function ContactCode() {
  const lang = useLang();
  const en = lang === "en";
  const { file, lines, laid, total, output } = packs[lang];
  const box = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0);
  const [started, setStarted] = useState(false);
  const [cur, setCur] = useState(packs.id.lines.length - 1);
  const [copied, setCopied] = useState(false);
  const [locked, setLocked] = useState(false);
  const [step, setStep] = useState(-1);
  const running = step >= 0 && step < output.length - 1;
  const done = typed >= total;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => {
        setTyped(total);
        setStarted(true);
      }, 0);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [total]);

  useEffect(() => {
    if (!started || typed >= total) return;
    const id = window.setTimeout(() => setTyped((n) => Math.min(total, n + 3)), 16);
    return () => window.clearTimeout(id);
  }, [started, typed, total]);

  useEffect(() => {
    if (step < 0 || step >= output.length - 1) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), 420);
    return () => window.clearTimeout(id);
  }, [step, output.length]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const run = () => {
    if (!done || running) return;
    setStep(0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCur((c) => Math.min(lines.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCur((c) => Math.max(0, c - 1));
    } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      run();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.target as HTMLElement).tagName !== "BUTTON") {
      setLocked(true);
      window.setTimeout(() => setLocked(false), 900);
    }
  };

  const col = Math.min(lineLength(lines[cur] ?? []), Math.max(0, typed - (laid[cur]?.[0]?.start ?? 0))) + 1;

  return (
    <div ref={box} className="code" role="group" aria-label={en ? "Contact details as code, read-only" : "Kontak dalam bentuk kode, hanya baca"} onKeyDown={onKeyDown}>
      <div className="code-tab">
        <span className="code-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="code-file">{file}</span>
        <button type="button" onClick={run} disabled={!done || running} className="code-run" data-state={!done ? "typing" : running ? "running" : "idle"}>
          <span className="run-ico" aria-hidden="true">
            {running ? (
              <svg viewBox="0 0 24 24" focusable="false" className="run-spin h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M12 3a9 9 0 1 1-9 9" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" focusable="false" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M8 5.5v13l10.5-6.5z" />
              </svg>
            )}
          </span>
          <span>{!done ? (en ? "Typing" : "Mengetik") : running ? (en ? "Running" : "Berjalan") : en ? "Run" : "Jalankan"}</span>
          <kbd className="run-kbd" aria-hidden="true">Ctrl ↵</kbd>
        </button>
      </div>

      <pre className="code-body" tabIndex={0} aria-label={en ? `Contents of ${file}` : `Isi ${file}`}>
        <code>
          {laid.map((line, li) => {
            return (
              <span key={li} className="code-line" data-cur={done && cur === li} onClick={() => setCur(li)}>
                {line.map(({ t, start }, ti) => {
                  const shown = done ? t.s.length : Math.max(0, Math.min(t.s.length, typed - start));
                  const hasCaret = started && (done ? cur === li && ti === line.length - 1 : typed >= start && typed < start + t.s.length);
                  return <Rendered key={ti} token={t} shown={shown} caret={hasCaret} />;
                })}
                {li === 1 && done && (
                  <button type="button" onClick={copy} className="code-copy" aria-label={en ? "Copy email" : "Salin email"}>
                    <Glyph kind={copied ? "check" : "copy"} className="h-4 w-4" />
                    <span>{copied ? (en ? "Copied" : "Tersalin") : en ? "Copy" : "Salin"}</span>
                  </button>
                )}
              </span>
            );
          })}
        </code>
      </pre>

      {step >= 0 && (
        <div className="code-term" aria-live="polite">
          <p className="code-term-h mono">Terminal</p>
          {output.slice(0, step + 1).map((o, i) => (
            <p key={i} className={`term-${o.t}`}>
              {o.t === "cmd" && <span className="term-prompt">$ </span>}
              {o.t === "ok" && <span className="term-ok">✔ </span>}
              {o.s}
            </p>
          ))}
          {step >= output.length - 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={`mailto:${profile.email}`} className="btn-live btn-live-accent !min-h-[40px] !px-4">
                <Glyph kind="send" />
                <span>{en ? "Send email" : "Kirim email"}</span>
              </a>
              <button type="button" onClick={() => setStep(-1)} className="code-copy !ml-0">
                {en ? "Clear" : "Bersihkan"}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="code-status mono">
        <span className="code-lock" data-flash={locked}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          {locked ? (en ? "Read-only, cannot be edited" : "Hanya baca, tidak bisa diedit") : en ? "Read-only" : "Hanya baca"}
        </span>
        <span>
          Ln {cur + 1}, Col {col}
        </span>
        <span className="hidden sm:inline">TypeScript</span>
        <span className="hidden md:inline">{en ? "↑↓ move line · Ctrl+Enter run" : "↑↓ pindah baris · Ctrl+Enter jalankan"}</span>
      </div>
    </div>
  );
}
