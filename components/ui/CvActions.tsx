"use client";

import { siGoogledrive } from "simple-icons";
import { cv } from "@/content/profile";
import { Magnetic } from "@/components/fx/Magnetic";
import { useLang } from "@/components/i18n/useLang";
import { Glyph } from "./Glyph";
import { TechIcon } from "./TechIcon";

// Tombol unduh mengikuti bahasa situs: EN mengunduh CV Inggris, ID mengunduh CV Indonesia.
export function CvActions() {
  const lang = useLang();
  const en = lang === "en";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Magnetic>
        <a href={cv.file[lang]} download={cv.fileName[lang]} className="btn-live btn-live-accent">
          <Glyph kind="download" />
          <span>{en ? "Download PDF (English)" : "Unduh PDF (Indonesia)"}</span>
        </a>
      </Magnetic>
      <Magnetic>
        <a href={cv.file[en ? "id" : "en"]} download={cv.fileName[en ? "id" : "en"]} className="btn-live">
          <Glyph kind="download" />
          <span>{en ? "Indonesian version" : "Versi bahasa Inggris"}</span>
        </a>
      </Magnetic>
      {cv.driveUrl && (
        <Magnetic>
          <a href={cv.driveUrl} target="_blank" rel="noopener noreferrer" className="btn-live">
            <TechIcon icon={siGoogledrive} className="btn-glyph h-5 w-5" />
            <span>{en ? "Open in Google Drive" : "Buka di Google Drive"}</span>
          </a>
        </Magnetic>
      )}
    </div>
  );
}
