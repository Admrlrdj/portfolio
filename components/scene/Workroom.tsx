"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { scrollToHash } from "@/lib/scroll";
import { IsoIcon, type IsoKind } from "@/components/ui/IsoIcon";
import { hotspots, type HotspotId } from "./hotspots";
import { WorkroomArt } from "./WorkroomArt";
import { TV } from "@/components/i18n/T";
import { useLang } from "@/components/i18n/useLang";
import { bi, type Bi } from "@/lib/i18n";

const WorkroomSpline = dynamic(() => import("./WorkroomSpline"), { ssr: false });

const sceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL;

const rail: Record<HotspotId, IsoKind> = { proyek: "monitor", pengalaman: "calendar", keahlian: "books", pendidikan: "frame", kontak: "phone" };
const HOLD_MS = 350;

type Mode = "idle" | "spline" | "art-only";

function unsupportedReason(): Bi | null {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return bi("pengaturan perangkatmu meminta gerak dikurangi", "your device settings ask for reduced motion");
  }
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return bi("mode hemat data aktif", "data saver is on");
  if (nav.hardwareConcurrency <= 2 || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2)) {
    return bi("perangkat ini terdeteksi berdaya rendah", "this device looks low-powered");
  }
  const probe = document.createElement("canvas");
  if (!probe.getContext("webgl2") && !probe.getContext("webgl")) {
    return bi("browser ini tidak mendukung WebGL", "this browser does not support WebGL");
  }
  return null;
}

export function Workroom() {
  const box = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const [note, setNote] = useState<Bi | null>(null);
  const lang = useLang();
  const holdLabel = (id: HotspotId) => {
    const label = hotspots.find((h) => h.id === id)?.label[lang] ?? "";
    return lang === "en" ? `Release to open ${label}` : `Lepas untuk membuka ${label}`;
  };
  const [splineReady, setSplineReady] = useState(false);
  const [active, setActive] = useState<HotspotId | null>(null);
  const [hold, setHold] = useState<{ x: number; y: number; ready: boolean } | null>(null);
  const pressed = useRef<HotspotId | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const activeRef = useRef<HotspotId | null>(null);
  const holdTimer = useRef<number | undefined>(undefined);

  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    e.currentTarget.style.setProperty("--px", (nx * 2 - 1).toFixed(3));
    e.currentTarget.style.setProperty("--py", (ny * 2 - 1).toFixed(3));
    e.currentTarget.style.setProperty("--sx", `${(nx * 100).toFixed(1)}%`);
    e.currentTarget.style.setProperty("--sy", `${(ny * 100).toFixed(1)}%`);
  };
  const untilt = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--px", "0");
    e.currentTarget.style.setProperty("--py", "0");
    cancelHold();
  };

  // Tahan di scene: ring terisi dan scene mendekat; lepas di atas benda untuk membuka bagiannya. Ketukan singkat juga membuka.
  const cancelHold = () => {
    window.clearTimeout(holdTimer.current);
    pressed.current = null;
    setHold(null);
  };
  const press = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    e.currentTarget.style.setProperty("--ox", `${((x / r.width) * 100).toFixed(1)}%`);
    e.currentTarget.style.setProperty("--oy", `${((y / r.height) * 100).toFixed(1)}%`);
    pressed.current = active;
    start.current = { x: e.clientX, y: e.clientY };
    setHold({ x, y, ready: false });
    holdTimer.current = window.setTimeout(() => setHold((h) => (h ? { ...h, ready: true } : h)), HOLD_MS);
  };
  // Hanya klik atau tahan sungguhan yang membuka bagian; menyeret scene tidak.
  const release = (e: React.PointerEvent<HTMLDivElement>) => {
    const id = pressed.current ?? active;
    const was = hold;
    const s = start.current;
    const moved = s ? Math.hypot(e.clientX - s.x, e.clientY - s.y) > 8 : true;
    start.current = null;
    cancelHold();
    if (was && id && !moved) {
      const spot = hotspots.find((h) => h.id === id);
      if (spot) scrollToHash(spot.href);
    }
  };

  // Saat kursor di atas benda, roda mouse tidak menggulung halaman.
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (activeRef.current) e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Spline baru diunduh saat area ini mendekati viewport, supaya teks hero tidak menunggunya.
  useEffect(() => {
    const el = box.current;
    if (!el || !sceneUrl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const reason = unsupportedReason();
        setNote(reason ? bi(`Ruangan 3D tidak dimuat karena ${reason.id}. Versi gambar ditampilkan.`, `The 3D room was not loaded because ${reason.en}. Showing the illustrated version.`) : null);
        setMode(reason ? "art-only" : "spline");
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
      <div className="order-last lg:order-first">
        <ul className="rail flex flex-col gap-2">
          {hotspots.map((h) => (
            <li key={h.id} className="rail-item">
              <a
                href={h.href}
                data-active={active === h.id}
                onMouseEnter={() => setActive(h.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(h.id)}
                onBlur={() => setActive(null)}
                className="rail-btn"
              >
                <IsoIcon kind={rail[h.id]} className="rail-icon h-10 w-10 shrink-0" />
                <span className="min-w-0">
                  <span className="block font-semibold leading-tight">
                    <TV v={h.label} />
                  </span>
                  <span className="mono block leading-tight">
                    <TV v={h.hint} />
                  </span>
                </span>
                <span aria-hidden="true" className="rail-go">→</span>
              </a>
            </li>
          ))}
        </ul>
        {note && (
          <p className="mono mt-4 text-muted">
            <TV v={note} />
          </p>
        )}
      </div>

      <div
        ref={box}
        onPointerMoveCapture={tilt}
        onPointerLeave={untilt}
        // Capture: runtime Spline menghentikan propagasi pointer dari canvas, jadi handler bubbling tidak pernah terpanggil.
        onPointerDownCapture={press}
        onPointerUpCapture={release}
        onPointerCancelCapture={cancelHold}
        data-hold={hold?.ready ? "true" : "false"}
        data-lit={active ?? "none"}
        data-lenis-prevent={active ? "" : undefined}
        className="scene-box relative h-[54dvh] overflow-hidden rounded-md border border-line bg-sunk lg:h-[min(72dvh,46rem)]"
      >
        <span aria-hidden="true" className="scene-spot" />
        <div className="scene-zoom absolute inset-0">
          <WorkroomArt active={active} onActive={setActive} hidden={splineReady} />
        {mode === "spline" && sceneUrl && (
          <div
            aria-hidden="true"
            onPointerLeave={() => setActive(null)}
            className={`absolute inset-0 transition-opacity duration-300 ${splineReady ? "opacity-100" : "opacity-0"}`}
          >
            <WorkroomSpline scene={sceneUrl} onReady={() => setSplineReady(true)} onActive={setActive} onPress={(id) => (pressed.current = id)} />
          </div>
        )}
        </div>
        <span aria-hidden="true" className="scene-dust">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </span>
        <p aria-hidden="true" className="scene-hud mono">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20l1.2-4.6L16.5 4.1a2 2 0 0 1 2.8 0l.6.6a2 2 0 0 1 0 2.8L8.6 18.8z" />
            <path d="M14.5 6l3.5 3.5" />
          </svg>
          <TV v={bi("Klik benda di ruangan · ponsel = kontak", "Click objects in the room · phone = contact")} />
        </p>
        {active && !hold && (
          <span aria-hidden="true" className="scene-note" key={active}>
            <svg viewBox="0 0 80 50" className="scene-note-arrow" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M74 44C60 40 40 34 22 14" />
              <path d="M20 26L21 12L33 15" />
            </svg>
            <span className="scene-note-text">
              <strong>
                <TV v={hotspots.find((h) => h.id === active)!.hint} />
              </strong>
              <span>
                → <TV v={hotspots.find((h) => h.id === active)!.label} />
              </span>
            </span>
          </span>
        )}
        {hold && (
          <span aria-hidden="true" className="hold-ring" data-ready={hold.ready} style={{ left: hold.x, top: hold.y }}>
            <svg viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="24" pathLength="1" />
            </svg>
            {hold.ready && active && <em>{holdLabel(active)}</em>}
          </span>
        )}
      </div>
    </div>
  );
}
