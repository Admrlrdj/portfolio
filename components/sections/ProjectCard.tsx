"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { TechChip } from "@/components/ui/TechIcon";
import { RobotError } from "./RobotError";
import { TV } from "@/components/i18n/T";

const OPEN_DELAY_MS = 160;

// Kursor di atas kartu: sampul berganti menjadi tangkapan halaman utama situsnya yang bergulir pelan.
// Proyek tanpa tangkapan menampilkan robot 404 yang matanya mengikuti kursor.
export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const cover = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const enter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
  };
  const leave = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };
  const look = (e: React.PointerEvent) => {
    const el = cover.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--lx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--ly", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const host = project.links[0]?.href.replace(/^https:\/\//, "").replace(/\/$/, "") ?? project.slug;

  return (
    <article
      data-hint="Buka"
      data-hint-en="Open"
      data-open={open}
      onPointerEnter={enter}
      onPointerLeave={leave}
      onPointerMove={look}
      className="card hs-slide pv-card relative flex flex-col rounded-md border border-line bg-paper"
    >
      <div ref={cover} className="pv-cover relative aspect-[16/10] overflow-hidden rounded-t-md border-b border-line">
        <ProjectCover slug={project.slug} className="h-full w-full rounded-none border-0" />
        {open && (
          <div className="pv-live" aria-hidden="true">
            <div className="pv-bar">
              <span />
              <span />
              <span />
              <em>{host}</em>
            </div>
            {project.preview ? (
              // eslint-disable-next-line @next/next/no-img-element -- tangkapan statis kecil, dimuat hanya saat hover
              <img src={project.preview} alt="" className="pv-shot" decoding="async" />
            ) : (
              <RobotError />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mono text-muted">
          <TV v={project.period} /> · <TV v={project.role} />
        </p>
        <h3 className="h-card mt-2">
          <Link href={`/projects/${project.slug}`} className="link stretch">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3">
          <TV v={project.summary} />
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((s) => (
            <li key={s}>
              <TechChip label={s} />
            </li>
          ))}
        </ul>
        {project.links.length > 0 && (
          <ul className="relative z-10 mt-auto flex flex-wrap gap-x-3 pt-4">
            {project.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="tap link">
                  <TV v={l.label} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
