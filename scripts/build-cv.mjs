import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { marked } from "marked";

const root = resolve(import.meta.dirname, "..");
// Dua versi: Inggris (berkas utama) dan Indonesia.
const builds = [
  { lang: "en", source: join(root, "content", "cv", "CV_Radja_Admiral_ATS.md"), output: join(root, "public", "cv", "CV_Radja_Admiral_ATS_EN.pdf") },
  { lang: "id", source: join(root, "content", "cv", "CV_Radja_Admiral_ATS_ID.md"), output: join(root, "public", "cv", "CV_Radja_Admiral_ATS_ID.pdf") },
];

const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);
const chrome = chromeCandidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chrome tidak ditemukan. Set CHROME_PATH ke chrome.exe lalu jalankan ulang.");
  process.exit(1);
}

const style = `
  @page { size: A4; margin: 11mm 14mm; }
  body { font: 9.5pt/1.36 Arial, Helvetica, sans-serif; color: #111; }
  h1 { font-size: 20pt; margin: 0 0 2pt; letter-spacing: 0.5pt; }
  h2 { font-size: 10.5pt; margin: 9pt 0 3pt; padding-bottom: 2pt; border-bottom: 1pt solid #111; text-transform: uppercase; }
  p { margin: 2pt 0; }
  ul { margin: 2pt 0 4pt 14pt; padding: 0; }
  li { margin: 1pt 0; }
  hr { display: none; }
  a { color: inherit; text-decoration: none; }
`;
mkdirSync(join(root, "public", "cv"), { recursive: true });

for (const { lang, source, output } of builds) {
  // Nomor telepon dibuang dari CV publik; versi lengkap bisa diunggah sendiri ke Google Drive.
  const markdown = readFileSync(source, "utf8").replace(/\+62[\d\s-]+\|\s*/g, "");
  const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>Radja Admiral - CV</title><style>${style}</style></head><body>${marked.parse(markdown, { breaks: true })}</body></html>`;
  const work = mkdtempSync(join(tmpdir(), "cv-build-"));
  const htmlPath = join(work, "cv.html");
  writeFileSync(htmlPath, html);
  if (process.env.CV_HTML_OUT) writeFileSync(process.env.CV_HTML_OUT.replace(/\.html$/, `-${lang}.html`), html);
  try {
    execFileSync(
      chrome,
      ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${output}`, pathToFileURL(htmlPath).href],
      { stdio: "ignore" },
    );
    console.log(`CV (${lang}) ditulis ke ${output}`);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}
