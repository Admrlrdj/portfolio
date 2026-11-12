import type { Metadata } from "next";
import Link from "next/link";
import { CvViewer } from "@/components/cv/CvViewer";
import { T } from "@/components/i18n/T";
import { cvHtml } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description:
    "Curriculum Vitae Radja Admiral dalam format ramah ATS, dilengkapi pratinjau dokumen langsung di web dan opsi unduh PDF.",
};

export default function CvPage() {
  const html = cvHtml();

  return (
    <div className="wrap page-top pb-20">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/" className="tap link">
          ← <T id="Beranda" en="Home" />
        </Link>
        <span className="text-muted">·</span>
        <Link href="/#kamar" className="tap link">
          🏠 <T id="Kamar 3D" en="3D Room" />
        </Link>
      </div>

      <h1 className="h-display mt-4 !text-[clamp(2.25rem,1.5rem+3.5vw,3.75rem)]">
        Curriculum Vitae
      </h1>
      <p className="mt-3 max-w-[44rem] text-muted">
        <T
          id="Pendidikan, proyek, dan pengalaman saya dalam format ramah ATS. Tampilan Web otomatis mengikuti bahasa di navbar (Bahasa Indonesia / English), sedangkan Pratinjau PDF Asli disajikan dalam Bahasa Inggris (Official ATS Edition)."
          en="My education, projects, and experience in an ATS-friendly format. The Web view automatically syncs with the navbar language (English / Indonesian), while the Direct PDF Preview is provided in English (Official ATS Edition)."
        />
      </p>

      <CvViewer html={html} />
    </div>
  );
}
