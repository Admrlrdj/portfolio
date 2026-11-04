import { Hero } from "@/components/sections/Hero";
import { WorkroomSection } from "@/components/sections/WorkroomSection";
import { ProjectCarousel } from "@/components/sections/ProjectCarousel";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { personJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero />
      <WorkroomSection />
      <ProjectCarousel />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
