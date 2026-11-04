import { Shards } from "@/components/fx/Shards";
import { projects } from "@/content/projects";
import { HSlider } from "@/components/fx/HSlider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectCard } from "./ProjectCard";
import { T } from "@/components/i18n/T";
import { bi } from "@/lib/i18n";

export function ProjectCarousel() {
  return (
    <section id="proyek" aria-labelledby="proyek-judul" className="page">
      <Shards seed={2} />
      <div className="wrap w-full">
        <SectionTitle id="proyek-judul" icon="monitor">
          <T id="Proyek" en="Projects" />
        </SectionTitle>
        <p className="mt-3 max-w-[40rem] text-muted">
          <T
            id="Hal-hal yang sudah saya bangun, dari aplikasi pendeteksi kantuk berbasis AI hingga situs advokasi lingkungan. Arahkan kursor ke kartu untuk melihat sekilas tampilannya."
            en="Things I have built, from an AI-powered drowsiness detector to an environmental advocacy site. Hover over a card for a quick look at the live site."
          />
        </p>
        <Reveal className="mt-8">
          <HSlider label={bi("Proyek", "Projects")}>
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </HSlider>
        </Reveal>
      </div>
    </section>
  );
}
