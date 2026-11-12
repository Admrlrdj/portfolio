"use client";

import { useState } from "react";
import { cv } from "@/content/profile";
import { useLang } from "@/components/i18n/useLang";
import { Glyph } from "@/components/ui/Glyph";

type Props = {
  html: { en: string; id: string };
};

export function CvViewer({ html }: Props) {
  const siteLang = useLang();
  const enUI = siteLang === "en";

  // Mode:
  // - "doc": Web ATS View dwibahasa (otomatis berganti ID / EN mengikuti saklar bahasa di Navbar)
  // - "pdf": Embed PDF Preview (English Only via endpoint streaming /api/cv/preview agar tidak dicegat IDM)
  const [viewMode, setViewMode] = useState<"doc" | "pdf">("doc");
  const [zoom, setZoom] = useState<number>(100);

  const zoomOut = () => setZoom((z) => Math.max(75, z - 10));
  const zoomIn = () => setZoom((z) => Math.min(140, z + 10));
  const resetZoom = () => setZoom(100);

  // Endpoint khusus tanpa ekstensi .pdf di URL agar tidak dicegat oleh IDM (Internet Download Manager)
  const previewStreamUrl = "/api/cv/preview";
  const downloadPdfUrl = cv.file.en;
  const downloadPdfName = cv.fileName.en;

  return (
    <div className="cv-viewer-root mt-6 space-y-6">
      {/* Interactive CV Toolbar */}
      <div
        role="toolbar"
        aria-label={enUI ? "CV View Mode Controls" : "Kontrol Tampilan CV"}
        className="cv-toolbar"
      >
        {/* View Mode Toggle: Web ATS View (Bilingual synced with Navbar) vs Embed PDF Preview (English Only) */}
        <div className="cv-toolbar-group">
          <span className="mono text-xs text-muted">
            <span className="l-id">Tampilan:</span>
            <span className="l-en">View:</span>
          </span>
          <div className="cv-seg">
            <button
              type="button"
              data-cv-mode="doc"
              data-active={viewMode === "doc" ? "true" : "false"}
              aria-pressed={viewMode === "doc"}
              onClick={() => setViewMode("doc")}
              className="cv-seg-btn mono font-semibold"
            >
              📄 <span>Web ATS View</span>
            </button>
            <button
              type="button"
              data-cv-mode="pdf"
              data-active={viewMode === "pdf" ? "true" : "false"}
              aria-pressed={viewMode === "pdf"}
              onClick={() => setViewMode("pdf")}
              className="cv-seg-btn mono"
            >
              📑 <span>Embed PDF Preview (English)</span>
            </button>
          </div>
        </div>

        {/* Zoom Controls (aktif saat membaca Web ATS View) */}
        <div className="cv-toolbar-group">
          <button
            type="button"
            onClick={zoomOut}
            data-cv-zoom="out"
            className="cv-tool-btn mono"
            aria-label={enUI ? "Zoom out" : "Perkecil ukuran"}
          >
            −
          </button>
          <button
            type="button"
            onClick={resetZoom}
            data-cv-zoom="fit"
            className="cv-tool-btn mono min-w-[3.6rem]"
            title={enUI ? "Reset zoom (100%)" : "Atur ulang ukuran (100%)"}
          >
            {zoom}%
          </button>
          <button
            type="button"
            onClick={zoomIn}
            data-cv-zoom="in"
            className="cv-tool-btn mono"
            aria-label={enUI ? "Zoom in" : "Perbesar ukuran"}
          >
            +
          </button>
        </div>

        {/* Action: Unduh Berkas PDF Resmi (English Only) */}
        <div className="cv-toolbar-actions">
          <a
            href={downloadPdfUrl}
            download={downloadPdfName}
            data-cv-download="en"
            className="btn-live btn-live-accent !min-h-[2.45rem] !px-3.5 !py-1.5 !text-xs font-semibold"
            title={enUI ? "Download English ATS CV PDF" : "Unduh Berkas PDF CV ATS (English)"}
          >
            <Glyph kind="download" className="h-4 w-4" />
            <span>
              <span className="l-id">Unduh PDF (English)</span>
              <span className="l-en">Download PDF (English)</span>
            </span>
          </a>
        </div>
      </div>

      {/* Main Document / PDF Viewport */}
      {viewMode === "doc" ? (
        <div className="overflow-x-auto pb-4">
          <article
            className="cv-sheet mx-auto transition-transform duration-150"
            style={{
              zoom: `${zoom}%`,
            }}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 mono text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                <span className="l-id font-semibold text-foreground">🇮🇩 FORMAT RESMI ATS · EDISI BAHASA INDONESIA</span>
                <span className="l-en font-semibold text-foreground">🇬🇧 OFFICIAL ATS FORMAT · ENGLISH EDITION</span>
              </span>
              <span>Radja Admiral · Curriculum Vitae</span>
            </div>

            {/* Tampilan Web ATS View: bilingual otomatis berganti (ID / EN) mengikuti tombol saklar bahasa di Navbar */}
            <div
              key="cv-id"
              lang="id"
              className="cv-doc l-id"
              dangerouslySetInnerHTML={{ __html: html.id }}
            />
            <div
              key="cv-en"
              lang="en"
              className="cv-doc l-en"
              dangerouslySetInnerHTML={{ __html: html.en }}
            />
          </article>
        </div>
      ) : (
        <div className="cv-pdf-viewport">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 mono text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-foreground">
                🇬🇧 Direct In-App PDF Preview (Official English ATS Edition)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={previewStreamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link text-accent"
              >
                <span className="l-id">Buka di Tab Baru ↗</span>
                <span className="l-en">Open Stream in Tab ↗</span>
              </a>
              <span>·</span>
              <a
                href={downloadPdfUrl}
                download={downloadPdfName}
                className="link text-accent font-semibold"
              >
                <span className="l-id">Unduh PDF ↓</span>
                <span className="l-en">Download PDF ↓</span>
              </a>
            </div>
          </div>

          {/* Embedded Native PDF Viewer Container via Endpoint /api/cv/preview (English Only, No .pdf extension to avoid IDM hijack) */}
          <div className="cv-pdf-embed-box">
            <object
              data={`${previewStreamUrl}#view=FitH`}
              type="application/pdf"
              className="w-full h-[85vh] rounded-lg border border-line block"
              aria-label={downloadPdfName}
            >
              <iframe
                src={`${previewStreamUrl}#toolbar=1`}
                title={downloadPdfName}
                className="w-full h-[85vh] rounded-lg border-0 block"
              />
              {/* Fallback jika plugin PDF dinonaktifkan di browser */}
              <div className="p-8 text-center bg-paper text-foreground">
                <p className="text-muted text-sm mb-4">
                  <span className="l-id">Jika plugin browser Anda tidak menampilkan preview, silakan beralih ke Web ATS View atau buka dokumen langsung.</span>
                  <span className="l-en">If your browser plugin cannot render the embedded PDF, you can read the document in Web ATS View or open the stream directly.</span>
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setViewMode("doc")}
                    className="btn-live !min-h-[2.4rem] !px-4 !py-1.5 !text-xs font-semibold"
                  >
                    📄 <span className="l-id">Buka Web ATS View</span><span className="l-en">Switch to Web ATS View</span>
                  </button>
                  <a
                    href={previewStreamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-live btn-live-accent !min-h-[2.4rem] !px-4 !py-1.5 !text-xs"
                  >
                    📑 <span className="l-id">Buka Dokumen PDF ↗</span><span className="l-en">Open PDF Stream ↗</span>
                  </a>
                </div>
              </div>
            </object>

            {/* Note pembantu jika pengguna mengakses dari perangkat seluler */}
            <div className="cv-pdf-mobile-note">
              <p className="text-xs text-muted leading-relaxed">
                <span className="l-id">Membaca di HP? Beralih ke Web ATS View yang responsif atau buka stream PDF di tab baru.</span>
                <span className="l-en">Mobile viewer? Switch to the responsive Web ATS View or open the PDF stream directly in a new tab.</span>
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("doc")}
                  className="btn-live !min-h-[2.2rem] !px-3 !py-1 !text-xs font-semibold"
                >
                  📄 <span className="l-id">Beralih ke Web ATS View</span><span className="l-en">Switch to Web ATS View</span>
                </button>
                <a
                  href={previewStreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-live btn-live-accent !min-h-[2.2rem] !px-3 !py-1 !text-xs"
                >
                  📑 <span className="l-id">Buka di Tab Baru ↗</span><span className="l-en">Open in New Tab ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
