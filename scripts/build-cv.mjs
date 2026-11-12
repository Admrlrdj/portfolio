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

// Baca foto formal 3x4 dan QR code sebagai data URI agar headless Chrome merender langsung tanpa request jaringan.
const photoPath = join(root, "public", "photo", "radja.png");
const photoB64 = existsSync(photoPath) ? readFileSync(photoPath).toString("base64") : "";
const photoDataUrl = photoB64 ? `data:image/png;base64,${photoB64}` : "";

const qrPath = join(root, "public", "photo", "qr-portfolio.svg");
const qrSvg = existsSync(qrPath) ? readFileSync(qrPath, "utf8") : "";
const qrDataUrl = qrSvg ? `data:image/svg+xml;utf8,${encodeURIComponent(qrSvg)}` : "";

const style = `
  @page {
    size: A4;
    margin: 11mm 13mm;
  }
  * { box-sizing: border-box; }
  body {
    font: 8.8pt/1.33 Arial, Helvetica, sans-serif;
    color: #111;
    margin: 0;
    padding: 0;
  }
  .cv-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 5pt;
    padding-bottom: 5pt;
    border-bottom: 1.2pt solid #111;
  }
  .cv-header-left {
    flex: 1;
    padding-right: 12pt;
  }
  h1 {
    font-size: 18pt;
    font-weight: bold;
    margin: 0 0 3pt;
    letter-spacing: 0.4pt;
    color: #0e1116;
  }
  .cv-contact {
    font-size: 8.2pt;
    line-height: 1.4;
    color: #333;
  }
  .cv-contact a {
    color: #0e1116;
    text-decoration: none;
    font-weight: 500;
  }
  .cv-header-right {
    display: flex;
    align-items: center;
    gap: 8pt;
    flex-shrink: 0;
  }
  .cv-photo-box {
    width: 21mm;
    height: 28mm;
    border: 0.8pt solid #222;
    border-radius: 2pt;
    overflow: hidden;
    background: #f4f1ea;
  }
  .cv-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    display: block;
  }
  .cv-qr-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 21mm;
    height: 28mm;
    padding: 2pt;
    border: 0.8pt solid #ccc;
    border-radius: 2pt;
    background: #fff;
    text-align: center;
    text-decoration: none;
  }
  .cv-qr {
    width: 17.5mm;
    height: 17.5mm;
    display: block;
  }
  .cv-qr-label {
    font-size: 5pt;
    font-family: monospace;
    font-weight: bold;
    color: #333;
    margin-top: 1.5pt;
    letter-spacing: -0.2pt;
  }
  h2 {
    font-size: 9.8pt;
    font-weight: bold;
    margin: 6.5pt 0 2.5pt;
    padding-bottom: 1.5pt;
    border-bottom: 0.75pt solid #111;
    text-transform: uppercase;
    letter-spacing: 0.3pt;
    page-break-after: avoid;
    break-after: avoid;
  }
  p {
    margin: 1.5pt 0;
  }
  strong {
    font-weight: bold;
    color: #0e1116;
  }
  ul {
    margin: 1.5pt 0 3pt 13pt;
    padding: 0;
  }
  li {
    margin: 1pt 0;
    line-height: 1.32;
  }
  hr {
    display: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

mkdirSync(join(root, "public", "cv"), { recursive: true });

for (const { lang, source, output } of builds) {
  // Nomor telepon dibuang dari CV publik; versi lengkap bisa diunggah sendiri ke Google Drive.
  const raw = readFileSync(source, "utf8").replace(/\+62[\d\s-]+\|\s*/g, "");
  
  // Pisahkan header (# NAME dan kontak) dari body dokumen
  const headerMatch = raw.match(/^#\s+([^\n]+)\n\n([\s\S]*?)\n\n---\n/);
  let headerHtml = "";
  let bodyMarkdown = raw;

  if (headerMatch) {
    const name = headerMatch[1];
    const contactText = headerMatch[2].trim();
    bodyMarkdown = raw.slice(headerMatch[0].length);

    // Format kontak dengan tautan aktif
    const contactLines = contactText.split("\n").map((line) => {
      return line
        .replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1">$1</a>')
        .replace(/(admieral\.is-a\.dev)/g, '<a href="https://$1">$1</a>')
        .replace(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/g, '<a href="https://$1">$1</a>')
        .replace(/(github\.com\/[a-zA-Z0-9_-]+)/g, '<a href="https://$1">$1</a>');
    }).join("<br>");

    headerHtml = `
      <header class="cv-header">
        <div class="cv-header-left">
          <h1>${name}</h1>
          <div class="cv-contact">${contactLines}</div>
        </div>
        <div class="cv-header-right">
          ${photoDataUrl ? `
          <div class="cv-photo-box">
            <img src="${photoDataUrl}" alt="${name}" class="cv-photo" />
          </div>` : ""}
          ${qrDataUrl ? `
          <a href="https://admieral.is-a.dev" class="cv-qr-card">
            <img src="${qrDataUrl}" alt="Portfolio QR Code" class="cv-qr" />
            <span class="cv-qr-label">admieral.is-a.dev</span>
          </a>` : ""}
        </div>
      </header>
    `;
  }

  const bodyHtml = marked.parse(bodyMarkdown, { breaks: true });
  const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>Radja Admiral - Curriculum Vitae</title><style>${style}</style></head><body>${headerHtml}${bodyHtml}</body></html>`;
  
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
