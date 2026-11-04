import { TV } from "@/components/i18n/T";
import { bi, type Bi } from "@/lib/i18n";
// Robot 404 untuk proyek tanpa pratinjau. Mata dan kepala mengikuti kursor lewat --lx/--ly dari kartu.
const fallback = bi("Pratinjau tidak tersedia", "Preview not available");

export function RobotError({ label = fallback }: { label?: Bi }) {
  return (
    <div className="robo">
      <svg viewBox="0 0 220 170" className="robo-svg" aria-hidden="true" focusable="false">
        <text x="110" y="128" textAnchor="middle" className="robo-404">
          404
        </text>
        <g className="robo-spark">
          <path d="M150 18l-6 10h7l-6 11" />
          <path d="M70 22l5 8h-6l5 9" />
        </g>
        <g className="robo-head">
          <line x1="110" y1="40" x2="110" y2="22" className="robo-wire" />
          <circle cx="110" cy="18" r="6" className="robo-bulb" />
          <rect x="62" y="40" width="96" height="74" rx="14" className="robo-shell" />
          <rect x="52" y="64" width="10" height="26" rx="4" className="robo-ear" />
          <rect x="158" y="64" width="10" height="26" rx="4" className="robo-ear" />
          <rect x="74" y="52" width="72" height="44" rx="8" className="robo-screen" />
          <g className="robo-eyes">
            <g className="robo-eye">
              <circle cx="94" cy="72" r="9" className="robo-white" />
              <circle cx="94" cy="72" r="4.2" className="robo-pupil" />
            </g>
            <g className="robo-eye">
              <circle cx="126" cy="72" r="9" className="robo-white" />
              <circle cx="126" cy="72" r="4.2" className="robo-pupil" />
            </g>
          </g>
          <path d="M92 104l6-5 6 5 6-5 6 5 6-5 6 5" className="robo-mouth" />
        </g>
        <rect x="84" y="118" width="52" height="30" rx="6" className="robo-shell" />
        <path d="M94 128h32M94 136h20" className="robo-wire" />
      </svg>
      <p className="robo-text mono">
        <b className="robo-code">404</b> · <TV v={label} />
      </p>
    </div>
  );
}
