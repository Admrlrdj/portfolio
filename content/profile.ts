import { bi } from "@/lib/i18n";

export const profile = {
  name: "Radja Admiral",
  role: bi("Fullstack Developer · Mahasiswa D4 Software Engineering Technology, IPB University", "Fullstack Developer · Software Engineering Technology student (D4), IPB University"),
  intro: bi(
    "Saya senang membangun produk web dan sistem di baliknya, serta bekerja bersama tim untuk menyelesaikannya.",
    "I enjoy building web products and the systems behind them, and working with a team to ship them.",
  ),
  email: "radjaadmiral00@gmail.com",
  github: "https://github.com/Admrlrdj",
  linkedin: "https://www.linkedin.com/in/admieral/",
  instagram: "https://www.instagram.com/rdjadmrl/",
} as const;

export const nav = [
  { href: "#kamar", label: bi("Kamar", "Room") },
  { href: "#proyek", label: bi("Proyek", "Projects") },
  { href: "#pengalaman", label: bi("Pengalaman", "Experience") },
  { href: "#keahlian", label: bi("Keahlian", "Skills") },
  { href: "#pendidikan", label: bi("Pendidikan", "Education") },
  { href: "#kontak", label: bi("Kontak", "Contact") },
] as const;

export const cv = {
  file: {
    en: "/cv/CV_Radja_Admiral_ATS_EN.pdf",
    id: "/cv/CV_Radja_Admiral_ATS_ID.pdf",
  },
  fileName: { en: "CV_Radja_Admiral_ATS_EN.pdf", id: "CV_Radja_Admiral_ATS_ID.pdf" },
  driveUrl: process.env.NEXT_PUBLIC_CV_DRIVE_URL ?? "",
} as const;
