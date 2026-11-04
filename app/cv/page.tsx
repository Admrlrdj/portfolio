import type { Metadata } from "next";
import Link from "next/link";
import { CvActions } from "@/components/ui/CvActions";
import { T } from "@/components/i18n/T";
import { cvHtml } from "@/lib/cv";

export const metadata: Metadata = {
  title: "CV",
  description: "CV Radja Admiral dalam bahasa Indonesia dan Inggris, format ramah ATS, bisa dibaca di sini atau diunduh sebagai PDF.",
};

// CV ditampilkan sebagai halaman (bukan PDF tertanam yang sering kosong di HP) dan berganti mengikuti saklar ID/EN.
export default function CvPage() {
  const html = cvHtml();

  return (
    <div className="wrap page-top pb-16">
      <Link href="/" className="tap link">
        <T id="Beranda" en="Home" />
      </Link>
      <h1 className="h-display mt-4 !text-[clamp(2.25rem,1.5rem+3.5vw,3.75rem)]">CV</h1>
      <p className="mt-3 max-w-[40rem] text-muted">
        <T
          id="Format satu kolom yang bisa dibaca sistem ATS, tersedia dalam bahasa Indonesia dan Inggris. Ganti bahasa lewat saklar ID/EN di atas. Nomor telepon tidak dicantumkan di versi publik ini."
          en="A single-column, ATS-friendly format, available in English and Indonesian. Switch with the ID/EN toggle above. The phone number is left out of this public version."
        />
      </p>
      <div className="mt-6">
        <CvActions />
      </div>

      <article className="cv-sheet mt-8">
        <div lang="id" className="l-id cv-doc" dangerouslySetInnerHTML={{ __html: html.id }} />
        <div lang="en" className="l-en cv-doc" dangerouslySetInnerHTML={{ __html: html.en }} />
      </article>
    </div>
  );
}
