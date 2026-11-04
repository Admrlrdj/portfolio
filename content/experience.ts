import { bi, type Bi } from "@/lib/i18n";

export type Experience = {
  period: Bi;
  role: Bi;
  org: string;
  points: Bi[];
};

export const experience: Experience[] = [
  {
    period: bi("Feb 2025 – Agu 2025", "Feb 2025 – Aug 2025"),
    role: bi("Koordinator Lomba Pengembangan Perangkat Lunak", "Software Development Competition Coordinator"),
    org: "IT Festival, IPB University",
    points: [
      bi(
        "Mengoordinasikan lomba pengembangan perangkat lunak dengan 50+ peserta dari beberapa universitas.",
        "Coordinated a software development competition with 50+ participants from several universities.",
      ),
      bi("Mengelola jadwal, juri, mentor, dan logistik.", "Managed the schedule, judges, mentors, and logistics."),
    ],
  },
  {
    period: bi("Des 2024 – Nov 2025", "Dec 2024 – Nov 2025"),
    role: bi("Active Member Tim Web Development", "Active Member, Web Development Team"),
    org: "Google Developer Group on Campus, IPB University",
    points: [
      bi(
        "Berkontribusi pada workshop coding dan proyek mini dengan Python dan teknologi web.",
        "Contributed to coding workshops and mini projects using Python and web technologies.",
      ),
    ],
  },
  {
    period: bi("Sep 2024 – Nov 2025", "Sep 2024 – Nov 2025"),
    role: bi("Staf Divisi Webmaster", "Webmaster Division Staff"),
    org: "HIMAVO Micro IT Community, IPB University",
    points: [
      bi("Mempelajari dasar HTML, CSS, JavaScript, dan Git selama beberapa bulan.", "Learned the basics of HTML, CSS, JavaScript, and Git over several months."),
      bi("Bekerja dengan tim inti lewat Git dan GitHub, menjaga konsistensi merek.", "Worked with the core team through Git and GitHub, keeping the brand consistent."),
    ],
  },
  {
    period: bi("Jul 2023 – Jan 2024", "Jul 2023 – Jan 2024"),
    role: bi("Information Technology Intern", "Information Technology Intern"),
    org: "PT Electronic City Indonesia Tbk, Jakarta",
    points: [
      bi("Mendukung sistem internal, termasuk ERP dan operasi backend e-commerce.", "Supported internal systems, including ERP and e-commerce back-office operations."),
      bi(
        "Menangani pemecahan masalah perangkat lunak dan dukungan infrastruktur jaringan dasar lintas departemen.",
        "Handled software troubleshooting and basic network infrastructure support across departments.",
      ),
    ],
  },
  {
    period: bi("Mei 2023 – Jun 2023", "May 2023 – Jun 2023"),
    role: bi("Peserta Bootcamp Web dan Mobile Development", "Web and Mobile Development Bootcamp Participant"),
    org: "Politeknik Jakarta Internasional (JIHS)",
    points: [
      bi(
        "Membuat antarmuka dengan React.js dan React Native, serta RESTful API dengan Go dan PHP (Laravel, CodeIgniter 4) dalam tim Agile.",
        "Built interfaces with React.js and React Native, and RESTful APIs with Go and PHP (Laravel, CodeIgniter 4), in an Agile team.",
      ),
    ],
  },
];
