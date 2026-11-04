import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/cv` },
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}` })),
  ];
}
