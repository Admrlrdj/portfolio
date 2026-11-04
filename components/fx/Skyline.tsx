// Siluet kota 2D ala New York untuk latar footer. Warnanya diatur CSS (.sky-*) sehingga ikut terbalik dari tema:
// tema terang -> footer gelap, kota malam dengan jendela menyala; tema gelap -> footer terang, kota siang.
// Dibuat sekali secara deterministik (seed tetap) agar hasil server dan klien sama.

const W = 1600;
const H = 340;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Win = { x: number; y: number; w: number; h: number; on: boolean; blink: number };

function rect(x: number, y: number, w: number, h: number) {
  return `M${x} ${y}h${w}v${h}h${-w}Z`;
}

// Gedung latar belakang: deretan kotak dengan tinggi acak.
function farLayer() {
  const r = rng(7);
  let d = "";
  for (let x = -20; x < W + 20; ) {
    const w = 34 + r() * 56;
    const h = 70 + r() * 150;
    d += rect(x, H - h, w, h);
    if (r() < 0.25) d += rect(x + w * 0.3, H - h - 14, w * 0.4, 14);
    x += w - 4;
  }
  return d;
}

// Landmark: stepped tower dengan antena (Empire State).
function empire(cx: number) {
  const base = H;
  return [
    rect(cx - 52, base - 170, 104, 170),
    rect(cx - 38, base - 215, 76, 45),
    rect(cx - 26, base - 250, 52, 35),
    rect(cx - 14, base - 272, 28, 22),
    rect(cx - 7, base - 290, 14, 18),
    rect(cx - 2, base - 330, 4, 40),
  ].join("");
}

// Mahkota bertingkat runcing (Chrysler).
function chrysler(cx: number) {
  const base = H;
  const body = rect(cx - 34, base - 200, 68, 200);
  let crown = "";
  for (let i = 0; i < 5; i += 1) {
    const half = 28 - i * 5.5;
    const y = base - 198 - i * 15;
    crown += `M${cx - half} ${y}V${y - 8}Q${cx} ${y - 8 - half * 1.15} ${cx + half} ${y - 8}V${y}Z`;
  }
  crown += `M${cx - 4} ${base - 262}L${cx} ${base - 322}L${cx + 4} ${base - 262}Z`;
  return body + crown;
}

// Menara meruncing dengan antena (One World Trade Center).
function oneWtc(cx: number) {
  const base = H;
  return `M${cx - 46} ${base}V${base - 60}L${cx - 30} ${base - 300}H${cx + 30}L${cx + 46} ${base - 60}V${base}Z` + rect(cx - 2, base - 336, 4, 36);
}

// Tangki air kayu khas atap New York.
function waterTower(x: number, y: number) {
  return rect(x, y - 16, 14, 12) + `M${x - 1} ${y - 16}L${x + 7} ${y - 23}L${x + 15} ${y - 16}Z` + rect(x + 2, y - 4, 2, 4) + rect(x + 10, y - 4, 2, 4);
}

function nearLayer() {
  const r = rng(42);
  let d = "";
  const wins: Win[] = [];
  const landmarks = [
    { at: 0.17, w: 92, draw: oneWtc },
    { at: 0.43, w: 68, draw: chrysler },
    { at: 0.7, w: 104, draw: empire },
  ];
  let x = -10;
  while (x < W + 10) {
    const mark = landmarks[0];
    const left = mark ? mark.at * W - mark.w / 2 - 4 : Infinity;
    if (mark && x >= left - 30) {
      const cx = mark.at * W;
      d += mark.draw(cx);
      // Jendela di badan landmark.
      for (let wy = H - 160; wy < H - 14; wy += 16) {
        for (let wx = cx - mark.w / 2 + 12; wx < cx + mark.w / 2 - 14; wx += 12) {
          wins.push({ x: wx, y: wy, w: 5, h: 8, on: r() < 0.3, blink: r() });
        }
      }
      landmarks.shift();
      x = cx + mark.w / 2 + 4;
      continue;
    }
    const w = Math.min(46 + r() * 70, left - x - 2);
    const h = 46 + r() * 120;
    const top = H - h;
    d += rect(x, top, w, h);
    if (r() < 0.35) d += waterTower(x + 8 + r() * (w - 30), top);
    else if (r() < 0.3) d += rect(x + w / 2 - 1, top - 18, 2, 18);
    for (let wy = top + 12; wy < H - 12; wy += 15) {
      for (let wx = x + 8; wx < x + w - 10; wx += 11) {
        wins.push({ x: wx, y: wy, w: 5, h: 7, on: r() < 0.26, blink: r() });
      }
    }
    x += w + 2 + r() * 6;
  }
  return { d, wins };
}

const far = farLayer();
const near = nearLayer();
const starRng = rng(2026);
const stars = Array.from({ length: 34 }, () => ({ x: starRng() * W, y: 6 + starRng() * (H - 240), s: 0.8 + starRng() * 1.4, blink: starRng() }));

export function Skyline() {
  return (
    <svg className="sky" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <circle className="sky-orb" cx={W * 0.31} cy={58} r={24} />
      <g className="sky-stars">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.s.toFixed(2)} style={{ animationDelay: `${(-s.blink * 5).toFixed(2)}s` }} />
        ))}
      </g>
      <path className="sky-far" d={far} />
      <path className="sky-near" d={near.d} />
      <g className="sky-win">
        {near.wins.map((w, i) => (
          <rect
            key={i}
            x={w.x.toFixed(1)}
            y={w.y.toFixed(1)}
            width={w.w}
            height={w.h}
            className={w.on ? (w.blink < 0.12 ? "on blink" : "on") : undefined}
            style={w.on && w.blink < 0.12 ? { animationDelay: `${(-w.blink * 60).toFixed(2)}s` } : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
