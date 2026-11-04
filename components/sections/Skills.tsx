import { Shards } from "@/components/fx/Shards";
import { skills } from "@/content/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TechIcon, iconFor } from "@/components/ui/TechIcon";
import { T, TV } from "@/components/i18n/T";
import type { Bi } from "@/lib/i18n";

function monogram(name: string) {
  return name
    .split(/[\s/()-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

function Tile({ item }: { item: string | Bi }) {
  const name = typeof item === "string" ? item : item.id;
  const icon = iconFor(name);
  return (
    <li className="skill-chip">
      <span className="skill-icon">{icon ? <TechIcon icon={icon} className="h-6 w-6" /> : <span className="skill-mono">{monogram(name)}</span>}</span>
      <span className="font-semibold leading-tight">{typeof item === "string" ? item : <TV v={item} />}</span>
    </li>
  );
}

export function Skills() {
  return (
    <section id="keahlian" aria-labelledby="keahlian-judul" className="page">
      <Shards seed={4} />
      <div className="wrap w-full">
        <SectionTitle id="keahlian-judul" icon="books">
          <T id="Keahlian" en="Skills" />
        </SectionTitle>
        <Reveal className="mt-8 space-y-5">
          {skills.map((row, i) => {
            // Grup diulang sampai cukup lebar, lalu digandakan agar putarannya tanpa sambungan.
            const reps = Math.max(1, Math.ceil(9 / row.items.length));
            const group = Array.from({ length: reps }, () => row.items).flat();
            return (
              <div key={row.category.id} role="group" aria-label={row.category.id}>
                <p className="mono mb-2 text-muted">
                  <TV v={row.category} />
                </p>
                <div className="mq" style={{ "--dur": `${group.length * 3.2}s`, "--dir": i % 2 ? "reverse" : "normal" } as React.CSSProperties}>
                  <div className="mq-track">
                    <ul className="mq-group">
                      {group.map((name, k) => (
                        <Tile key={`${typeof name === "string" ? name : name.id}-${k}`} item={name} />
                      ))}
                    </ul>
                    <ul className="mq-group" aria-hidden="true">
                      {group.map((name, k) => (
                        <Tile key={`${typeof name === "string" ? name : name.id}-${k}`} item={name} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
