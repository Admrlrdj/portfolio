import { Shards } from "@/components/fx/Shards";
import { certifications, education } from "@/content/education";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Glyph } from "@/components/ui/Glyph";
import { T, TV } from "@/components/i18n/T";

export function Education() {
  return (
    <section id="pendidikan" aria-labelledby="pendidikan-judul" className="page">
      <Shards seed={5} />
      <div className="wrap grid w-full gap-12 md:grid-cols-2 md:gap-16">
        <div className="min-w-0">
          <SectionTitle id="pendidikan-judul" icon="frame">
            <T id="Pendidikan" en="Education" />
          </SectionTitle>
          <ul className="mt-8 space-y-8 border-l border-ink pl-6">
            {education.map((e, i) => (
              <li key={e.school} className="relative">
                <span aria-hidden="true" className="absolute -left-[1.9rem] top-2 h-3 w-3 border border-ink bg-paper" />
                <Reveal delay={i * 80}>
                  <p className="mono text-muted">
                    <TV v={e.period} />
                  </p>
                  <h3 className="font-serif text-2xl">{e.school}</h3>
                  <p>
                    <TV v={e.program} />
                  </p>
                  <p className="text-muted">
                    <TV v={e.note} />
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h2 className="h-section">
            <T id="Sertifikasi" en="Certifications" />
          </h2>
          <ul className="mt-8 space-y-3">
            {certifications.map((c, i) => (
              <li key={c.title.id}>
                <Reveal delay={i * 80}>
                  <div data-hint="Bukti" data-hint-en="Proof" className="card cert relative rounded-sm border border-ink p-4 shadow-[3px_3px_0_var(--ink)]">
                    <p className="font-semibold">
                      <TV v={c.title} />
                    </p>
                    <p className="text-muted">{c.issuer}</p>
                    <p className="mono text-muted">
                      <TV v={c.period} />
                    </p>
                    <a href={c.proof} target="_blank" rel="noopener noreferrer" className="tap link mt-1 gap-2 stretch">
                      <T id="Lihat bukti" en="View proof" />
                      <Glyph kind="external" className="h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
