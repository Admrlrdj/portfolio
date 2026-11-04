import { Shards } from "@/components/fx/Shards";
import { CvButton } from "@/components/ui/CvButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactCode } from "./ContactCode";
import { T } from "@/components/i18n/T";

export function Contact() {
  return (
    <section id="kontak" aria-labelledby="kontak-judul" className="page">
      <Shards seed={6} />
      <div className="wrap w-full">
        <SectionTitle id="kontak-judul" icon="phone">
          <T id="Kontak" en="Contact" />
        </SectionTitle>
        <p className="mt-3 max-w-[36rem]">
          <T
            id="Email adalah cara tercepat untuk menghubungi saya. Saya membalas dalam bahasa Indonesia atau Inggris."
            en="Email is the fastest way to reach me. I reply in English or Indonesian."
          />
        </p>
        <Reveal className="mt-8 max-w-[40rem]">
          <ContactCode />
        </Reveal>
        <Reveal className="mt-8" delay={120}>
          <CvButton />
        </Reveal>
      </div>
    </section>
  );
}
