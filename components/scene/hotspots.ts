import { bi } from "@/lib/i18n";

export const hotspots = [
  { id: "proyek", object: "hotspot-proyek", href: "#proyek", label: bi("Proyek", "Projects"), hint: bi("Monitor di meja", "Monitor on the desk") },
  { id: "pengalaman", object: "hotspot-pengalaman", href: "#pengalaman", label: bi("Pengalaman", "Experience"), hint: bi("Kalender di dinding", "Wall calendar") },
  { id: "keahlian", object: "hotspot-keahlian", href: "#keahlian", label: bi("Keahlian", "Skills"), hint: bi("Rak buku", "Bookshelf") },
  { id: "pendidikan", object: "hotspot-pendidikan", href: "#pendidikan", label: bi("Pendidikan", "Education"), hint: bi("Bingkai sertifikat", "Certificate frame") },
  { id: "kontak", object: "hotspot-kontak", href: "#kontak", label: bi("Kontak", "Contact"), hint: bi("Ponsel di meja", "Phone on the desk") },
] as const;

export type HotspotId = (typeof hotspots)[number]["id"];

export function hotspotByObject(name: string) {
  return hotspots.find((h) => h.object === name);
}
