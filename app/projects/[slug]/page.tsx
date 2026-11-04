import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { ProjectDocs } from "@/components/sections/ProjectDocs";
import { T, TV } from "@/components/i18n/T";
import { bi, type Bi } from "@/lib/i18n";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary.id };
}

function Block({ title, children }: { title: Bi; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="h-section">
        <TV v={title} />
      </h2>
      <div className="mt-4 max-w-[42rem] space-y-4">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const study = project.caseStudy;

  return (
    <article className="wrap section-pad">
      <Link href="/#proyek" className="tap link">
        <T id="Semua proyek" en="All projects" />
      </Link>

      <ProjectCover slug={project.slug} className="mt-4 aspect-[16/9] max-w-[46rem]" />

      <header className="mt-6 max-w-[46rem]">
        <p className="mono text-muted">
          <TV v={project.period} /> · <TV v={project.role} />
        </p>
        <h1 className="h-display mt-2 !text-[clamp(2.25rem,1.5rem+3.5vw,3.75rem)]">{project.title}</h1>
        <p className="mt-4 text-lg">
          <TV v={project.summary} />
        </p>
        <p className="mono mt-4 text-muted">{project.stack.join(" · ")}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4">
          {project.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="tap link">
                <TV v={l.label} />
              </a>
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-10">
        <ProjectDocs project={project} />
        {study ? (
          <>
            <Block title={bi("Masalah", "Problem")}>
              <p>
                <TV v={study.problem} />
              </p>
            </Block>
            <Block title={bi("Peran saya", "My role")}>
              <p>
                <TV v={study.role} />
              </p>
            </Block>
            <Block title={bi("Keputusan teknis", "Technical decisions")}>
              {study.decisions.map((d) => (
                <div key={d.title.id}>
                  <h3 className="font-semibold">
                    <TV v={d.title} />
                  </h3>
                  <p className="text-muted">
                    <TV v={d.body} />
                  </p>
                </div>
              ))}
            </Block>
            <Block title={bi("Hasil", "Results")}>
              <ul className="list-disc space-y-2 pl-5 marker:text-line">
                {study.results.map((r) => (
                  <li key={r.id}>
                    <TV v={r} />
                  </li>
                ))}
              </ul>
            </Block>
            <Block title={bi("Yang belum selesai", "Not finished yet")}>
              <ul className="list-disc space-y-2 pl-5 marker:text-line">
                {study.unfinished.map((u) => (
                  <li key={u.id}>
                    <TV v={u} />
                  </li>
                ))}
              </ul>
            </Block>
          </>
        ) : (
          <Block title={bi("Yang saya kerjakan", "What I worked on")}>
            <ul className="list-disc space-y-2 pl-5 marker:text-line">
              {project.highlights.map((h) => (
                <li key={h.id}>
                  <TV v={h} />
                </li>
              ))}
            </ul>
          </Block>
        )}
      </div>
    </article>
  );
}
