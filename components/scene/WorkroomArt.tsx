import type { ReactNode } from "react";
import { hotspots, type HotspotId } from "./hotspots";
import { Box, Line, Quad, type P3 } from "./iso";

type SpotProps = {
  id: HotspotId;
  active: HotspotId | null;
  onActive: (id: HotspotId | null) => void;
  children: ReactNode;
};

function Spot({ id, active, onActive, children }: SpotProps) {
  const spot = hotspots.find((h) => h.id === id)!;
  return (
    <a
      href={spot.href}
      tabIndex={-1}
      data-active={active === id}
      className="room-spot"
      onMouseEnter={() => onActive(id)}
      onMouseLeave={() => onActive(null)}
    >
      {children}
    </a>
  );
}

type Props = { active: HotspotId | null; onActive: (id: HotspotId | null) => void; hidden: boolean };

export function WorkroomArt({ active, onActive, hidden }: Props) {
  const spot = { active, onActive };
  const calendarCells: P3[][] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const x = 1.1 + col * 0.55;
      const z = 3.25 + row * 0.5;
      calendarCells.push([[x, 0, z], [x + 0.38, 0, z], [x + 0.38, 0, z + 0.32], [x, 0, z + 0.32]]);
    }
  }
  const books: { y: number; w: number; h: number; pct: number }[] = [
    { y: 2.6, w: 0.5, h: 1.3, pct: 48 },
    { y: 3.2, w: 0.4, h: 1.0, pct: 30 },
    { y: 3.7, w: 0.55, h: 1.5, pct: 40 },
    { y: 4.4, w: 0.45, h: 1.1, pct: 54 },
    { y: 5.0, w: 0.5, h: 1.4, pct: 34 },
  ];

  return (
    <svg
      viewBox="92 34 456 410"
      aria-hidden="true"
      focusable="false"
      className={`room-art room-tilt absolute inset-0 h-full w-full transition-opacity duration-300 ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <g stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1" strokeLinejoin="round">
        <Quad pct={7} pts={[[0, 0, 0], [10, 0, 0], [10, 10, 0], [0, 10, 0]]} />
        <Quad pct={11} pts={[[0, 0, 0], [0, 10, 0], [0, 10, 6], [0, 0, 6]]} />
        <Quad pct={15} pts={[[0, 0, 0], [10, 0, 0], [10, 0, 6], [0, 0, 6]]} />

        <Box b={[0.6, 0.3, 0, 8.4, 2.4, 2.2]} tones={[34, 24, 40]} />

        <Box b={[3.8, 3.0, 1.2, 5.4, 4.6, 1.5]} tones={[44, 30, 38]} />
        <Box b={[3.8, 4.4, 1.5, 5.4, 4.6, 3.3]} tones={[44, 30, 36]} />
        <Box b={[4.4, 3.6, 0, 4.8, 4.0, 1.2]} tones={[28, 24, 26]} />

        <Spot id="proyek" {...spot}>
          <Box b={[4.5, 0.9, 2.2, 5.1, 1.3, 2.5]} tones={[40, 30, 36]} />
          <Box b={[3.4, 0.8, 2.5, 6.2, 1.1, 4.4]} tones={[40, 30, 36]} />
          <Quad pct={86} pts={[[3.6, 1.1, 2.7], [6.0, 1.1, 2.7], [6.0, 1.1, 4.2], [3.6, 1.1, 4.2]]} />
          <g strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9">
            <Line from={[3.9, 1.1, 3.9]} to={[5.0, 1.1, 3.9]} color="var(--paper)" />
            <Line from={[4.2, 1.1, 3.5]} to={[5.6, 1.1, 3.5]} color="var(--paper)" />
            <Line from={[4.2, 1.1, 3.1]} to={[5.2, 1.1, 3.1]} color="var(--paper)" />
          </g>
        </Spot>

        <Spot id="pengalaman" {...spot}>
          <Quad pct={4} pts={[[0.9, 0, 3], [3.5, 0, 3], [3.5, 0, 5.2], [0.9, 0, 5.2]]} />
          <Quad pct={55} pts={[[0.9, 0, 4.7], [3.5, 0, 4.7], [3.5, 0, 5.2], [0.9, 0, 5.2]]} />
          {calendarCells.map((cell, i) => (
            <Quad key={i} pct={i % 5 === 2 ? 40 : 14} pts={cell} />
          ))}
        </Spot>

        <Spot id="keahlian" {...spot}>
          <Box b={[0, 2.4, 3.2, 0.9, 7.2, 3.4]} tones={[44, 32, 40]} />
          {books.map((bk) => (
            <Box key={bk.y} b={[0.05, bk.y, 3.4, 0.75, bk.y + bk.w, 3.4 + bk.h]} tones={[bk.pct + 10, bk.pct - 6, bk.pct]} />
          ))}
        </Spot>

        <Spot id="pendidikan" {...spot}>
          <Quad pct={42} pts={[[6.4, 0, 3], [8.8, 0, 3], [8.8, 0, 5], [6.4, 0, 5]]} />
          <Quad pct={3} pts={[[6.65, 0, 3.25], [8.55, 0, 3.25], [8.55, 0, 4.75], [6.65, 0, 4.75]]} />
          <g strokeWidth="2" strokeLinecap="round" strokeOpacity="0.55">
            {[4.3, 4.0, 3.7].map((z, i) => (
              <Line key={z} from={[6.95, 0, z]} to={[i === 2 ? 7.9 : 8.25, 0, z]} color="var(--ink)" />
            ))}
          </g>
        </Spot>

        <Spot id="kontak" {...spot}>
          <Box b={[6.7, 0.9, 2.2, 7.5, 2.0, 2.34]} tones={[82, 40, 46]} />
        </Spot>
      </g>
    </svg>
  );
}
