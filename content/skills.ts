import { bi, type Bi } from "@/lib/i18n";

export type SkillRow = { category: Bi; items: (string | Bi)[] };

// Satu baris per kategori techstack; ikon dipilih di components/ui/TechIcon.tsx.
export const skills: SkillRow[] = [
  {
    category: bi("Front-end", "Front-end"),
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Lenis",
      "Leaflet",
      "Recharts",
      "jQuery",
      "Slick",
      "React Native",
      "Flutter",
    ],
  },
  {
    category: bi("Back-end", "Back-end"),
    items: ["Python", "FastAPI", "Go", "PHP", "Laravel", "CodeIgniter 4", "Node.js", "Express.js", "C#", "RESTful API", "OpenAPI"],
  },
  {
    category: bi("Database", "Database"),
    items: ["MySQL", "PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    category: bi("AI dan machine learning", "AI and machine learning"),
    items: ["Ultralytics YOLO11", "Claude Code", bi("ChatGPT dan Codex", "ChatGPT and Codex"), "Google Gemini"],
  },
  {
    category: bi("Platform dan alat", "Platforms and tools"),
    items: ["Git", "GitHub", "Vercel", "Railway", "WordPress", "SAP ERP"],
  },
  {
    category: bi("Kerja tim", "Teamwork"),
    items: [bi("Manajemen Proyek", "Project Management"), "Quality Assurance", bi("Dokumentasi Teknis", "Technical Documentation")],
  },
];
