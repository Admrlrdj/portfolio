import { readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

// CV dirender dari markdown yang sama dengan PDF-nya, saat build. Nomor telepon tidak ditampilkan.
function render(file: string) {
  const md = readFileSync(join(process.cwd(), "content", "cv", file), "utf8").replace(/\+62[\d\s-]+\|\s*/g, "");
  return marked.parse(md, { breaks: true, async: false });
}

export function cvHtml() {
  return { en: render("CV_Radja_Admiral_ATS.md"), id: render("CV_Radja_Admiral_ATS_ID.md") };
}
