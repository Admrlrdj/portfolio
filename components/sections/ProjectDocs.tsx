import type { Project } from "@/content/projects";
import { RobotError } from "./RobotError";
import { T, TV } from "@/components/i18n/T";
import { bi } from "@/lib/i18n";

// Galeri tangkapan layar situs proyek. Klik gambar membuka ukuran penuh di tab baru.
export function ProjectDocs({ project }: { project: Project }) {
  const docs = project.docs ?? [];
  const wide = docs.filter((d) => !d.mobile);
  const phone = docs.find((d) => d.mobile);

  return (
    <section className="border-t border-line py-8" aria-labelledby="dok-judul">
      <h2 id="dok-judul" className="h-section">
        <T id="Dokumentasi" en="Documentation" />
      </h2>
      {docs.length === 0 ? (
        <div className="doc-empty mt-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-line">
            <RobotError label={bi("Situs ini belum bisa ditangkap layarnya", "This site could not be captured yet")} />
          </div>
        </div>
      ) : (
        <>
          <p className="mt-2 max-w-[42rem] text-muted">
            <T id="Tangkapan layar dari situs yang sedang berjalan, diambil 4 November 2026." en="Screenshots of the live site, taken on 4 November 2026." />
          </p>
          <div className="doc-grid mt-6">
            {wide.map((d, i) => (
              <figure key={d.src} className="doc-fig" style={{ "--i": i } as React.CSSProperties}>
                <a href={d.src} target="_blank" rel="noopener noreferrer" className="doc-frame" aria-label={`Buka gambar / Open image: ${d.caption.id}`}>
                  <span className="doc-bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element -- tangkapan statis yang sudah dikecilkan */}
                  <img src={d.src} alt={d.caption.id} loading="lazy" decoding="async" width={1200} height={750} />
                </a>
                <figcaption className="mono mt-2 text-muted"><TV v={d.caption} />
                </figcaption>
              </figure>
            ))}
            {phone && (
              <figure className="doc-fig doc-phone">
                <a href={phone.src} target="_blank" rel="noopener noreferrer" className="doc-device" aria-label={`Buka gambar / Open image: ${phone.caption.id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- tangkapan statis yang sudah dikecilkan */}
                  <img src={phone.src} alt={phone.caption.id} loading="lazy" decoding="async" width={520} height={1126} />
                </a>
                <figcaption className="mono mt-2 text-center text-muted"><TV v={phone.caption} />
                </figcaption>
              </figure>
            )}
          </div>
        </>
      )}
    </section>
  );
}
