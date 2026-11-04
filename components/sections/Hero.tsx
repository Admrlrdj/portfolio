import type { CSSProperties } from "react";
import { siNextdotjs, siPython, siUltralytics } from "simple-icons";
import { profile } from "@/content/profile";
import { Avatar3D } from "@/components/fx/Avatar3D";
import { DotField } from "@/components/fx/DotField";
import { DraggableSticker } from "@/components/fx/DraggableSticker";
import { SpeechBubble } from "@/components/fx/SpeechBubble";
import { Magnetic } from "@/components/fx/Magnetic";
import { ParallaxScope } from "@/components/fx/ParallaxScope";
import { SplitText } from "@/components/fx/SplitText";
import { CvButton } from "@/components/ui/CvButton";
import { Glyph } from "@/components/ui/Glyph";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { T, TV } from "@/components/i18n/T";

const underline = { "--len": 330 } as CSSProperties;

export function Hero() {
  return (
    <ParallaxScope id="beranda" className="page">
      <DotField />
      <div className="wrap relative z-[1] grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:gap-16">
        <div className="min-w-0">
          <p className="mono text-muted">
            <TV v={profile.role} />
          </p>
          <h1 className="h-display mt-3">
            <SplitText text={profile.name} />
          </h1>
          <svg viewBox="0 0 300 14" aria-hidden="true" focusable="false" className="mt-1 h-3 w-full max-w-[18rem]">
            <path
              className="draw draw-load"
              style={underline}
              d="M2 9C30 2 50 14 80 7S130 2 160 8 220 13 298 5"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <p className="mt-6 max-w-[34rem] text-lg"><TV v={profile.intro} /></p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CvButton />
            <Magnetic>
              <a href="#proyek" className="btn-live">
                <Glyph kind="layers" />
                <T id="Lihat proyek" en="View projects" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#kontak" className="btn-live">
                <Glyph kind="send" />
                <T id="Kontak" en="Contact" />
              </a>
            </Magnetic>
          </div>

        </div>

        <Reveal className="relative mx-auto w-full max-w-[22rem] md:max-w-none">
          <SpeechBubble />
          <div className="px px-mid">
            <Avatar3D />
          </div>
          <div className="px px-front pointer-events-none absolute inset-0">
            <DraggableSticker className="pointer-events-auto left-[-0.5rem] top-[18%] -rotate-6">
              <TechIcon icon={siNextdotjs} /> Next.js
            </DraggableSticker>
            <DraggableSticker className="pointer-events-auto right-[-0.5rem] top-[44%] rotate-3">
              <TechIcon icon={siPython} /> Python
            </DraggableSticker>
            <DraggableSticker className="pointer-events-auto bottom-[14%] left-[2%] rotate-2">
              <TechIcon icon={siUltralytics} /> YOLO
            </DraggableSticker>
          </div>
          <p className="mono mt-2 text-center text-muted"><T id="Seret untuk memutar" en="Drag to rotate" /></p>
        </Reveal>
      </div>
    </ParallaxScope>
  );
}
