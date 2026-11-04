import { profile } from "@/content/profile";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteDescription =
  "Portfolio Radja Admiral, mahasiswa D4 Software Engineering Technology IPB University yang mencari magang full-stack atau backend Semester 6 (2027).";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "IPB University" },
  sameAs: [profile.github, profile.linkedin, profile.instagram],
};
