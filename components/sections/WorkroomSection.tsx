import { Shards } from "@/components/fx/Shards";
import { Workroom } from "@/components/scene/Workroom";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/i18n/T";

export function WorkroomSection() {
  return (
    <section id="kamar" aria-labelledby="kamar-judul" className="page">
      <Shards seed={1} />
      <div className="wrap w-full">
        <h2 id="kamar-judul" className="h-section">
          <T id="Kamar Radja" en="Radja&apos;s Room" />
        </h2>
        <p className="mt-3 max-w-[40rem] text-muted">
          <T
            id="Setiap benda di kamar ini membuka satu bagian situs. Pilih benda atau tombol di sampingnya."
            en="Each object in this room opens a section of the site. Pick an object or the button next to it."
          />
        </p>
        <Reveal className="mt-8">
          <Workroom />
        </Reveal>
      </div>
    </section>
  );
}
