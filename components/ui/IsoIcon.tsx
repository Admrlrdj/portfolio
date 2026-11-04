import { Box, IsoSvg, Line, Quad, type P3 } from "@/components/scene/iso";

export type IsoKind = "monitor" | "calendar" | "books" | "frame" | "phone" | "paper";

type Props = { kind: IsoKind; className?: string };

const MONITOR_BOX: P3[] = [[3.4, 0.8, 2.2], [6.2, 0.8, 4.4], [6.2, 1.3, 2.2]];
const CALENDAR_BOX: P3[] = [[0.9, 0, 3], [3.5, 0, 5.2]];
const BOOKS_BOX: P3[] = [[0, 2.4, 3.2], [0.9, 7.2, 4.9]];
const FRAME_BOX: P3[] = [[6.4, 0, 3], [8.8, 0, 5]];
const PHONE_BOX: P3[] = [[6.7, 0.9, 2.2], [7.5, 2.0, 2.34]];
const PAPER_BOX: P3[] = [[0, 0, 0], [3, 4, 0.1]];

export function IsoIcon({ kind, className = "h-11 w-11" }: Props) {
  switch (kind) {
    case "monitor":
      return (
        <IsoSvg box={MONITOR_BOX} className={className}>
          <Box b={[4.5, 0.9, 2.2, 5.1, 1.3, 2.5]} tones={[40, 30, 36]} />
          <Box b={[3.4, 0.8, 2.5, 6.2, 1.1, 4.4]} tones={[40, 30, 36]} />
          <Quad pct={86} pts={[[3.6, 1.1, 2.7], [6.0, 1.1, 2.7], [6.0, 1.1, 4.2], [3.6, 1.1, 4.2]]} />
          <g strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9">
            <Line from={[3.9, 1.1, 3.9]} to={[5.0, 1.1, 3.9]} color="var(--paper)" />
            <Line from={[4.2, 1.1, 3.5]} to={[5.6, 1.1, 3.5]} color="var(--paper)" />
          </g>
        </IsoSvg>
      );
    case "calendar":
      return (
        <IsoSvg box={CALENDAR_BOX} className={className}>
          <Quad pct={4} pts={[[0.9, 0, 3], [3.5, 0, 3], [3.5, 0, 5.2], [0.9, 0, 5.2]]} />
          <Quad pct={55} pts={[[0.9, 0, 4.7], [3.5, 0, 4.7], [3.5, 0, 5.2], [0.9, 0, 5.2]]} />
          {[0, 1, 2].flatMap((row) =>
            [0, 1, 2, 3].map((col) => {
              const x = 1.1 + col * 0.55;
              const z = 3.25 + row * 0.5;
              return (
                <Quad
                  key={`${row}-${col}`}
                  pct={(row + col) % 5 === 2 ? 40 : 14}
                  pts={[[x, 0, z], [x + 0.38, 0, z], [x + 0.38, 0, z + 0.32], [x, 0, z + 0.32]]}
                />
              );
            }),
          )}
        </IsoSvg>
      );
    case "books":
      return (
        <IsoSvg box={BOOKS_BOX} className={className}>
          <Box b={[0, 2.4, 3.2, 0.9, 7.2, 3.4]} tones={[44, 32, 40]} />
          {[
            { y: 2.6, w: 0.5, h: 1.3, pct: 48 },
            { y: 3.2, w: 0.4, h: 1.0, pct: 30 },
            { y: 3.7, w: 0.55, h: 1.5, pct: 40 },
            { y: 4.4, w: 0.45, h: 1.1, pct: 54 },
            { y: 5.0, w: 0.5, h: 1.4, pct: 34 },
          ].map((bk) => (
            <Box key={bk.y} b={[0.05, bk.y, 3.4, 0.75, bk.y + bk.w, 3.4 + bk.h]} tones={[bk.pct + 10, bk.pct - 6, bk.pct]} />
          ))}
        </IsoSvg>
      );
    case "frame":
      return (
        <IsoSvg box={FRAME_BOX} className={className}>
          <Quad pct={42} pts={[[6.4, 0, 3], [8.8, 0, 3], [8.8, 0, 5], [6.4, 0, 5]]} />
          <Quad pct={3} pts={[[6.65, 0, 3.25], [8.55, 0, 3.25], [8.55, 0, 4.75], [6.65, 0, 4.75]]} />
          <g strokeWidth="2" strokeLinecap="round" strokeOpacity="0.55">
            <Line from={[6.95, 0, 4.3]} to={[8.25, 0, 4.3]} color="var(--ink)" />
            <Line from={[6.95, 0, 4.0]} to={[8.25, 0, 4.0]} color="var(--ink)" />
            <Line from={[6.95, 0, 3.7]} to={[7.9, 0, 3.7]} color="var(--ink)" />
          </g>
        </IsoSvg>
      );
    case "phone":
      return (
        <IsoSvg box={PHONE_BOX} className={className}>
          <Box b={[6.7, 0.9, 2.2, 7.5, 2.0, 2.34]} tones={[82, 40, 46]} />
        </IsoSvg>
      );
    case "paper":
      return (
        <IsoSvg box={PAPER_BOX} className={className}>
          <Box b={[0, 0, 0, 3, 4, 0.12]} tones={[4, 30, 24]} />
          <g strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6">
            <Line from={[0.4, 0.6, 0.12]} to={[2.4, 0.6, 0.12]} color="var(--ink)" />
            <Line from={[0.4, 1.2, 0.12]} to={[2.6, 1.2, 0.12]} color="var(--ink)" />
            <Line from={[0.4, 1.8, 0.12]} to={[2.0, 1.8, 0.12]} color="var(--ink)" />
            <Line from={[0.4, 2.4, 0.12]} to={[2.5, 2.4, 0.12]} color="var(--ink)" />
            <Line from={[0.4, 3.0, 0.12]} to={[1.6, 3.0, 0.12]} color="var(--ink)" />
          </g>
        </IsoSvg>
      );
  }
}
