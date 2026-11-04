import { bi } from "@/lib/i18n";

export const education = [
  {
    period: bi("Agu 2024 – Jul 2028 (rencana)", "Aug 2024 – Jul 2028 (expected)"),
    school: "IPB University, Bogor",
    program: bi("D4 Software Engineering Technology", "Bachelor of Applied Science (D4), Software Engineering Technology"),
    note: bi("IPK 3,33 dari 4,00.", "GPA 3.33 / 4.00."),
  },
  {
    period: bi("Jul 2021 – Mei 2024", "Jul 2021 – May 2024"),
    school: "SMK Negeri 24 Jakarta",
    program: bi("Rekayasa Perangkat Lunak", "Software Engineering (vocational high school)"),
    note: bi("Nilai akhir 87.", "Final grade 87."),
  },
];

// Link bukti diambil dari bagian "Lisensi dan sertifikasi" di LinkedIn (3 Nov 2026).
export const certifications = [
  {
    title: bi("Sertifikat Bootcamp", "Bootcamp Certificate"),
    issuer: "Politeknik Jakarta Internasional",
    period: bi("Jun 2023", "Jun 2023"),
    proof: "https://drive.google.com/file/d/1oRfeiVfj4LVRJ9Y2KP9g05LYHaW5utRT/view?usp=sharing",
  },
  {
    title: bi("Sertifikat Kompetensi Pemrograman", "Programming Competency Certificate"),
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    period: bi("Mei 2024 – Mei 2027", "May 2024 – May 2027"),
    proof: "https://drive.google.com/file/d/19tVvHDKNuMw_ml01OZM5gv34iE-A_kH4/view?usp=drivesdk",
  },
  {
    title: bi("Gemini Academy Certified Student – University", "Gemini Academy Certified Student – University"),
    issuer: "Google for Education",
    period: bi("Sep 2026 – Sep 2029", "Sep 2026 – Sep 2029"),
    proof: "https://edu.google.accredible.com/01a196b7-03a4-4888-a6f5-ccf8d804d31b",
  },
];
