"use client";

import { Shards } from "@/components/fx/Shards";
import { useEffect, useRef, useState } from "react";
import { experience } from "@/content/experience";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { T, TV } from "@/components/i18n/T";

function Train() {
  return (
    <svg viewBox="0 0 40 52" aria-hidden="true" focusable="false" className="h-[3.25rem] w-10">
      <rect x="3" y="2" width="34" height="46" rx="9" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x="3" y="2" width="34" height="9" rx="9" fill="var(--accent)" />
      <rect x="8" y="14" width="24" height="13" rx="3" fill="var(--ink)" />
      <path d="M20 14v13" stroke="var(--paper)" strokeWidth="2" />
      <rect x="8" y="33" width="24" height="4" rx="2" fill="var(--accent)" />
      <circle cx="11" cy="42" r="2.6" fill="var(--ink)" />
      <circle cx="29" cy="42" r="2.6" fill="var(--ink)" />
    </svg>
  );
}

export function Experience() {
  const list = useRef<HTMLDivElement>(null);
  const train = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [passed, setPassed] = useState(-1);

  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const update = () => {
      const rect = ol.getBoundingClientRect();
      const y = Math.min(rect.height, Math.max(0, window.innerHeight * 0.55 - rect.top));
      if (train.current) train.current.style.transform = `translate3d(-50%, ${y - 26}px, 0)`;
      if (fill.current) fill.current.style.height = `${y}px`;
      const stops = Array.from(ol.querySelectorAll<HTMLElement>("li.krl-stop")).map((li) => li.offsetTop + 18);
      setPassed(stops.filter((s) => s <= y).length - 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="pengalaman" aria-labelledby="pengalaman-judul" className="page">
      <Shards seed={3} />
      <div className="wrap w-full">
        <SectionTitle id="pengalaman-judul" icon="calendar">
          <T id="Pengalaman" en="Experience" />
        </SectionTitle>
        <p className="mt-3 flex items-center gap-3 text-muted">
          <span className="line-badge">RA</span>
          <T id="Ikuti kereta untuk melewati tiap stasiun, dari yang terbaru ke yang terlama." en="Ride the train past each station, from the most recent to the oldest." />
        </p>

        <div ref={list} className="krl relative mt-10">
          <span aria-hidden="true" className="krl-track" />
          <span aria-hidden="true" ref={fill} className="krl-fill" />
          <div aria-hidden="true" ref={train} className="krl-train">
            <Train />
          </div>
          <ol>
          {experience.map((e, i) => (
            <li key={`${e.org}-${e.period.id}`} data-passed={i <= passed} className="krl-stop">
              <span aria-hidden="true" className="krl-dot" />
              <div className="grid gap-x-8 gap-y-1 md:grid-cols-[12rem_minmax(0,1fr)]">
                <p className="mono pt-1 text-muted">
                  <TV v={e.period} />
                </p>
                <div className="min-w-0">
                  <h3 className="font-serif text-xl">
                    <TV v={e.role} />
                  </h3>
                  <p className="text-muted">{e.org}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-line">
                    {e.points.map((p) => (
                      <li key={p.id}>
                        <TV v={p} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
