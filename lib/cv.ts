import { readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

function render(file: string) {
  const raw = readFileSync(join(process.cwd(), "content", "cv", file), "utf8").replace(/\+62[\d\s-]+\|\s*/g, "");
  const headerMatch = raw.match(/^#\s+([^\n]+)\n\n([\s\S]*?)\n\n---\n/);

  if (!headerMatch) {
    return marked.parse(raw, { breaks: true, async: false });
  }

  const name = headerMatch[1] ?? "";
  const contactText = (headerMatch[2] ?? "").trim();
  const bodyMarkdown = raw.slice(headerMatch[0].length);

  // Ubah baris kontak menjadi tautan aktif
  const contactHtml = contactText
    .split("\n")
    .map((line) => {
      return line
        .replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" class="link">$1</a>')
        .replace(/(admieral\.is-a\.dev)/g, '<a href="https://$1" target="_blank" rel="noopener noreferrer" class="link font-semibold text-accent">$1</a>')
        .replace(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/g, '<a href="https://$1" target="_blank" rel="noopener noreferrer" class="link">$1</a>')
        .replace(/(github\.com\/[a-zA-Z0-9_-]+)/g, '<a href="https://$1" target="_blank" rel="noopener noreferrer" class="link">$1</a>');
    })
    .join("<br />");

  const headerHtml = `
    <header class="cv-web-header">
      <div class="cv-web-header-left">
        <h1 class="cv-web-name">${name}</h1>
        <div class="cv-web-contact">${contactHtml}</div>
      </div>
      <aside class="cv-web-header-right">
        <div class="cv-web-photo-frame" title="${name} (Formal 3x4)">
          <img src="/photo/radja.png" alt="${name}" class="cv-web-photo" width="120" height="160" />
        </div>
        <a href="https://admieral.is-a.dev" target="_blank" rel="noopener noreferrer" class="cv-web-qr-badge" title="Open Portfolio Website: admieral.is-a.dev">
          <img src="/photo/qr-portfolio.svg" alt="Portfolio QR Code" class="cv-web-qr-img" width="76" height="76" />
          <span class="cv-web-qr-label mono">admieral.is-a.dev ↗</span>
        </a>
      </aside>
    </header>
  `;

  return `${headerHtml}${marked.parse(bodyMarkdown, { breaks: true, async: false })}`;
}

export function cvHtml() {
  return {
    en: render("CV_Radja_Admiral_ATS.md"),
    id: render("CV_Radja_Admiral_ATS_ID.md"),
  };
}
