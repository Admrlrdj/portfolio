// City Light Sketch Theme untuk latar penuh footer:
// Mengikuti identitas desain utama situs (satu warna aksen --fa/#ff7a55/#c23e1a, tinta --paper, dan latar --ink),
// digambar dengan gaya sketsa pena arsitektural tangan (double-stroke wobbles, over-extended construction corners,
// cross-hatching pena, awan arsir, bulan/matahari kompas arsitek di bagian atas yang utuh tidak terpotong,
// serta pendar jendela dan lampu jalan dalam palet kertas & aksen situs).
// Deterministik (seed tetap) agar hasil render server dan klien selalu identik.

const W = 1600;
const H = 760;
const GROUND = H - 36;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function n(v: number) {
  return Number(v.toFixed(1));
}

// Goresan pena tangan ganda (double-pass sketchy ink line):
// Setiap garis digambar 2 kali dengan sedikit gelombang & perpanjangan ujung (architectural overshoot) agar benar-benar tampak seperti sketsa tangan.
function penLine(x1: number, y1: number, x2: number, y2: number, r: () => number, over = 6) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;

  // Goresan pertama: melewati titik awal & akhir
  const o1 = over * (0.5 + r() * 0.8);
  const o2 = over * (0.5 + r() * 0.8);
  const sx1 = n(x1 - ux * o1 + nx * (r() - 0.5) * 1.2);
  const sy1 = n(y1 - uy * o1 + ny * (r() - 0.5) * 1.2);
  const ex1 = n(x2 + ux * o2 + nx * (r() - 0.5) * 1.2);
  const ey1 = n(y2 + uy * o2 + ny * (r() - 0.5) * 1.2);
  const cx1 = n((x1 + x2) / 2 + nx * (r() - 0.5) * 3.2);
  const cy1 = n((y1 + y2) / 2 + ny * (r() - 0.5) * 3.2);

  // Goresan kedua (double-stroke khas sketsa pena): sedikit bergeser dan tidak selalu sepanjang goresan pertama
  const sx2 = n(x1 - ux * (o1 * 0.3) + nx * (r() - 0.5) * 2.2);
  const sy2 = n(y1 - uy * (o1 * 0.3) + ny * (r() - 0.5) * 2.2);
  const ex2 = n(x2 + ux * (o2 * 0.4) + nx * (r() - 0.5) * 2.2);
  const ey2 = n(y2 + uy * (o2 * 0.4) + ny * (r() - 0.5) * 2.2);
  const cx2 = n((x1 + x2) / 2 + nx * (r() - 0.5) * 2.6);
  const cy2 = n((y1 + y2) / 2 + ny * (r() - 0.5) * 2.6);

  return `M${sx1} ${sy1}Q${cx1} ${cy1} ${ex1} ${ey1}M${sx2} ${sy2}Q${cx2} ${cy2} ${ex2} ${ey2}`;
}

// Goresan tunggal lepas untuk arsir & detail internal
function singleStroke(x1: number, y1: number, x2: number, y2: number, r: () => number, over = 2.5) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const ox = over * (0.3 + r() * 0.7);
  const sx = n(x1 - ux * ox);
  const sy = n(y1 - uy * ox);
  const ex = n(x2 + ux * ox);
  const ey = n(y2 + uy * ox);
  const mx = n((x1 + x2) / 2 + (r() - 0.5) * 2.2);
  const my = n((y1 + y2) / 2 + (r() - 0.5) * 2.2);
  return `M${sx} ${sy}Q${mx} ${my} ${ex} ${ey}`;
}

// Kotak gedung dengan sudut sketsa yang saling lewat (architectural corner ticks)
function penBox(x: number, y: number, w: number, h: number, r: () => number, over = 6.5) {
  return (
    penLine(x, y, x + w, y, r, over) +
    penLine(x, y, x, y + h, r, over) +
    penLine(x + w, y, x + w, y + h, r, over)
  );
}

// Arsir pena diagonal & cross-hatch pada sisi bayangan gedung
function penHatch(x: number, y: number, w: number, h: number, r: () => number, cross = false) {
  let d = "";
  const step = 6.5 + r() * 2.5;
  const shadeW = Math.min(w * 0.42, 34);
  for (let cy = y + 5; cy < y + h - 6; cy += step) {
    const x1 = x + 1.5 + (r() - 0.5) * 1.5;
    const x2 = x + shadeW * (0.65 + r() * 0.35);
    const y2 = Math.min(y + h - 2, cy + (x2 - x1) * 0.65);
    d += `M${n(x1)} ${n(cy)}L${n(x2)} ${n(y2)}`;
    if (cross && r() < 0.45) {
      const cyBack = Math.min(y + h - 2, cy + 7);
      d += `M${n(x1 + 2)} ${n(cyBack)}L${n(x2 * 0.85 + x * 0.15)} ${n(cy - 1)}`;
    }
  }
  return d;
}

// Jendela bergaya goresan tangan (bukan kotak sempurna, melainkan bingkai sketsa + arsir cahaya di dalamnya)
type SketchWin = {
  frame: string;
  glowRect?: { x: number; y: number; w: number; h: number };
  scribble?: string;
  accent: boolean;
  blink: number;
};

function makeWindow(wx: number, wy: number, ww: number, wh: number, on: boolean, accent: boolean, r: () => number): SketchWin {
  const frame =
    `M${n(wx - 0.8)} ${n(wy)}L${n(wx + ww + 0.8)} ${n(wy + (r() - 0.5) * 0.6)}` +
    `M${n(wx)} ${n(wy - 0.8)}L${n(wx + (r() - 0.5) * 0.6)} ${n(wy + wh + 0.8)}` +
    `M${n(wx + ww)} ${n(wy - 0.8)}L${n(wx + ww + (r() - 0.5) * 0.6)} ${n(wy + wh + 0.8)}` +
    `M${n(wx - 0.8)} ${n(wy + wh)}L${n(wx + ww + 0.8)} ${n(wy + wh + (r() - 0.5) * 0.6)}`;

  if (!on) {
    return { frame, accent: false, blink: 0 };
  }

  // Goresan arsir zig-zag cahaya di dalam jendela yang menyala
  const scribble =
    `M${n(wx + 1)} ${n(wy + 1.5)}L${n(wx + ww - 1)} ${n(wy + wh * 0.4)}` +
    `L${n(wx + 1)} ${n(wy + wh * 0.7)}L${n(wx + ww - 1)} ${n(wy + wh - 1)}`;

  return {
    frame,
    glowRect: { x: n(wx + 0.5), y: n(wy + 0.5), w: n(ww - 1), h: n(wh - 1) },
    scribble,
    accent,
    blink: r(),
  };
}

// Gedung lapis jauh: siluet sketsa tipis & arsir vertikal
function buildFarCity() {
  const r = rng(101);
  let fillPath = "";
  let strokePath = "";
  let hatchPath = "";

  for (let x = -10; x < W + 20; ) {
    const w = 38 + r() * 58;
    const h = 160 + r() * 290;
    const top = GROUND - h;
    fillPath += `M${n(x)} ${n(top)}h${n(w)}v${n(h)}h${n(-w)}Z`;
    strokePath +=
      singleStroke(x, top, x + w, top, r, 4.5) +
      singleStroke(x, top, x, GROUND, r, 3) +
      singleStroke(x + w, top, x + w, GROUND, r, 3);

    // Arsir vertikal tipis khas sketsa latar belakang
    const lines = 2 + Math.floor(r() * 4);
    for (let i = 1; i <= lines; i += 1) {
      const lx = x + (w / (lines + 1)) * i;
      hatchPath += `M${n(lx)} ${n(top + 4)}L${n(lx + (r() - 0.5) * 2)} ${n(GROUND - 40)}`;
    }

    // Menara atau step di atas gedung jauh
    if (r() < 0.42) {
      const rw = w * 0.48;
      const rx = x + (w - rw) / 2;
      const rh = 18 + r() * 24;
      fillPath += `M${n(rx)} ${n(top - rh)}h${n(rw)}v${n(rh)}h${n(-rw)}Z`;
      strokePath +=
        singleStroke(rx, top - rh, rx + rw, top - rh, r, 3.5) +
        singleStroke(rx, top - rh, rx, top, r, 2.5) +
        singleStroke(rx + rw, top - rh, rx + rw, top, r, 2.5);
      if (r() < 0.6) {
        strokePath += singleStroke(rx + rw / 2, top - rh - 36, rx + rw / 2, top - rh, r, 1.5);
      }
    }

    x += w - 6 + r() * 10;
  }

  return { fillPath, strokePath, hatchPath };
}

// Landmark 1: Menara obelisk modern dengan garis konstruksi silang (kiri)
function sketchModernTower(cx: number, r: () => number) {
  const b = GROUND;
  const h = 440;
  const topY = b - h;
  const fill = `M${n(cx - 50)} ${n(b)}L${n(cx - 32)} ${n(topY)}H${n(cx + 32)}L${n(cx + 50)} ${n(b)}Z`;
  let stroke =
    penLine(cx - 50, b, cx - 32, topY, r, 7) +
    penLine(cx + 50, b, cx + 32, topY, r, 7) +
    penLine(cx - 32, topY, cx + 32, topY, r, 8) +
    // Faset arsitektur diagonal
    singleStroke(cx - 32, topY, cx, b, r, 5) +
    singleStroke(cx + 32, topY, cx, b, r, 5) +
    singleStroke(cx, topY, cx - 50, b - 60, r, 4) +
    singleStroke(cx, topY, cx + 50, b - 60, r, 4) +
    // Antena puncak & cincin konstruksi
    penLine(cx, topY, cx, topY - 68, r, 3) +
    singleStroke(cx - 14, topY - 22, cx + 14, topY - 22, r, 3) +
    singleStroke(cx - 9, topY - 42, cx + 9, topY - 42, r, 2.5);

  // Garis tingkat horizontal
  for (let y = topY + 36; y < b - 20; y += 38) {
    const ratio = (y - topY) / h;
    const hw = 32 + ratio * 18;
    stroke += singleStroke(cx - hw, y, cx + hw, y, r, 3.5);
  }

  const hatch = penHatch(cx - 46, topY + 12, 36, h - 20, r, true);
  return { fill, stroke, hatch, spireY: topY - 68 };
}

// Landmark 2: Menara Art Deco bermahkota lengkung (tengah-kiri)
function sketchChrysler(cx: number, r: () => number) {
  const b = GROUND;
  const h = 350;
  const topY = b - h;
  const x = cx - 38;
  let fill = `M${n(x)} ${n(topY)}h76v${h}h-76Z`;
  let stroke = penBox(x, topY, 76, h, r, 7);
  const hatch = penHatch(x, topY, 76, h, r, true);

  for (let i = 0; i < 5; i += 1) {
    const half = 32 - i * 5.5;
    const cy = topY - i * 16;
    const arch = `M${n(cx - half - 3)} ${n(cy + 2)}Q${n(cx)} ${n(cy - half * 1.35)} ${n(cx + half + 3)} ${n(cy + 2)}`;
    fill += `M${n(cx - half)} ${n(cy)}Q${n(cx)} ${n(cy - half * 1.3)} ${n(cx + half)} ${n(cy)}Z`;
    stroke += arch + `M${n(cx - half * 0.45)} ${n(cy - 2)}L${n(cx)} ${n(cy - half * 0.8)}L${n(cx + half * 0.45)} ${n(cy - 2)}`;
  }
  const spireY = topY - 128;
  stroke += penLine(cx, topY - 72, cx, spireY, r, 3);
  return { fill, stroke, hatch, spireY };
}

// Landmark 3: Stepped Skyscraper (Empire State sketch di kanan-tengah)
function sketchEmpire(cx: number, r: () => number) {
  const b = GROUND;
  const tiers = [
    { w: 108, h: 250 },
    { w: 80, h: 315 },
    { w: 54, h: 368 },
    { w: 30, h: 405 },
    { w: 14, h: 432 },
  ];
  let fill = "";
  let stroke = "";
  let hatch = "";

  tiers.forEach((t, idx) => {
    const x = cx - t.w / 2;
    const y = b - t.h;
    const prevH = idx > 0 ? (tiers[idx - 1]?.h ?? 0) : 0;
    const segH = t.h - prevH;
    fill += `M${n(x)} ${n(y)}h${n(t.w)}v${n(segH)}h${n(-t.w)}Z`;
    stroke += penBox(x, y, t.w, segH, r, 6.5);
    if (idx < 4) hatch += penHatch(x, y, t.w, segH, r, idx === 0);
  });

  const spireY = b - 498;
  stroke +=
    penLine(cx, b - 432, cx, spireY, r, 3) +
    singleStroke(cx - 12, b - 455, cx + 12, b - 455, r, 3) +
    singleStroke(cx - 7, b - 474, cx + 7, b - 474, r, 2.5);

  return { fill, stroke, hatch, spireY };
}

// Tangki air kayu atap & menara rangka sketsa
function sketchWaterTower(x: number, y: number, r: () => number) {
  return (
    penBox(x, y - 19, 16, 13, r, 3) +
    singleStroke(x - 3, y - 19, x + 8, y - 29, r, 2.5) +
    singleStroke(x + 8, y - 29, x + 19, y - 19, r, 2.5) +
    singleStroke(x + 3, y - 6, x + 2, y, r, 1.5) +
    singleStroke(x + 13, y - 6, x + 14, y, r, 1.5) +
    singleStroke(x + 3, y - 6, x + 13, y, r, 1.5) +
    singleStroke(x + 13, y - 6, x + 3, y, r, 1.5)
  );
}

// Jembatan kabel gantung sketsa arsitektural
function sketchBridge(startX: number, endX: number, r: () => number) {
  const b = GROUND;
  const span = endX - startX;
  const t1 = startX + span * 0.28;
  const t2 = startX + span * 0.74;
  const deckY = b - 64;
  const topY = b - 220;
  let d = "";

  [t1, t2].forEach((tx) => {
    d += penBox(tx - 9, topY, 18, b - topY, r, 5);
    // Rangka silang (truss bracing) pada menara jembatan
    for (let ty = topY + 26; ty < deckY - 10; ty += 34) {
      d +=
        singleStroke(tx - 9, ty, tx + 9, ty, r, 2.5) +
        singleStroke(tx - 9, ty - 26, tx + 9, ty, r, 2) +
        singleStroke(tx + 9, ty - 26, tx - 9, ty, r, 2);
    }
  });

  // Dek jembatan ganda & kabel parabolik
  d += penLine(startX - 10, deckY, endX + 10, deckY, r, 8);
  d += singleStroke(startX - 10, deckY + 6, endX + 10, deckY + 6, r, 6);
  d += `M${n(startX)} ${n(deckY)}Q${n((startX + t1) / 2)} ${n(deckY - 18)} ${n(t1)} ${n(topY)}`;
  d += `M${n(t1)} ${n(topY)}Q${n((t1 + t2) / 2)} ${n(deckY + 18)} ${n(t2)} ${n(topY)}`;
  d += `M${n(t2)} ${n(topY)}Q${n((t2 + endX) / 2)} ${n(deckY - 18)} ${n(endX)} ${n(deckY)}`;

  // Kabel suspensi vertikal
  for (let vx = startX + 14; vx < endX - 10; vx += 14) {
    let cy = deckY;
    if (vx < t1) {
      const u = (vx - startX) / (t1 - startX);
      cy = (1 - u) * (1 - u) * deckY + 2 * (1 - u) * u * (deckY - 18) + u * u * topY;
    } else if (vx < t2) {
      const u = (vx - t1) / (t2 - t1);
      cy = (1 - u) * (1 - u) * topY + 2 * (1 - u) * u * (deckY + 18) + u * u * topY;
    } else {
      const u = (vx - t2) / (endX - t2);
      cy = (1 - u) * (1 - u) * topY + 2 * (1 - u) * u * (deckY - 18) + u * u * deckY;
    }
    d += `M${n(vx)} ${n(cy)}L${n(vx + (r() - 0.5) * 1.2)} ${n(deckY)}`;
  }

  return d;
}

type LampGlow = {
  x: number;
  y: number;
  r: number;
  accent: boolean;
  delay: number;
  rayPath: string;
};

// Membuat pancaran cahaya sketsa (hand-drawn starburst rays) di sekitar titik lampu kota
function makeStarburst(cx: number, cy: number, radius: number, r: () => number) {
  const hr = radius * 2.6;
  const dr = radius * 1.4;
  return (
    singleStroke(cx - hr, cy, cx + hr, cy, r, 1) +
    singleStroke(cx, cy - hr, cx, cy + hr, r, 1) +
    singleStroke(cx - dr, cy - dr, cx + dr, cy + dr, r, 0.5) +
    singleStroke(cx - dr, cy + dr, cx + dr, cy - dr, r, 0.5)
  );
}

function buildNearCity() {
  const r = rng(42);
  let fillPath = "";
  let strokePath = "";
  let hatchPath = "";
  let detailPath = "";
  let winFramePath = "";
  let winScribbleAccent = "";
  let winScribblePaper = "";
  const litWins: { x: number; y: number; w: number; h: number; accent: boolean; blink: number }[] = [];
  const lamps: LampGlow[] = [];

  const landmarks = [
    { at: 0.14, w: 100, draw: sketchModernTower },
    { at: 0.43, w: 76, draw: sketchChrysler },
    { at: 0.69, w: 108, draw: sketchEmpire },
  ];

  // Jembatan gantung di sisi kanan
  strokePath += sketchBridge(W * 0.76, W * 0.99, r);

  let x = -8;
  while (x < W + 8) {
    const mark = landmarks[0];
    const left = mark ? mark.at * W - mark.w / 2 - 4 : Infinity;
    if (mark && x >= left - 30) {
      const cx = mark.at * W;
      const res = mark.draw(cx, r);
      fillPath += res.fill;
      strokePath += res.stroke;
      hatchPath += res.hatch;

      // Jendela di badan landmark
      for (let wy = GROUND - 235; wy < GROUND - 16; wy += 16) {
        for (let wx = cx - mark.w / 2 + 11; wx < cx + mark.w / 2 - 13; wx += 12) {
          const on = r() < 0.34;
          const accent = r() < 0.58;
          const w = makeWindow(wx, wy, 5.5, 8, on, accent, r);
          winFramePath += w.frame;
          if (w.glowRect && w.scribble) {
            litWins.push({ ...w.glowRect, accent: w.accent, blink: w.blink });
            if (w.accent) winScribbleAccent += w.scribble;
            else winScribblePaper += w.scribble;
          }
        }
      }

      // Suar cahaya sketsa di puncak landmark
      lamps.push({
        x: cx,
        y: res.spireY,
        r: 4.2,
        accent: true,
        delay: r() * 5,
        rayPath: makeStarburst(cx, res.spireY, 4.5, r),
      });

      landmarks.shift();
      x = cx + mark.w / 2 + 6;
      continue;
    }

    const w = Math.min(46 + r() * 72, left - x - 4);
    const h = 80 + r() * 210;
    const top = GROUND - h;

    fillPath += `M${n(x)} ${n(top)}h${n(w)}v${n(h)}h${n(-w)}Z`;
    strokePath += penBox(x, top, w, h, r, 6.5);
    hatchPath += penHatch(x, top, w, h, r, r() < 0.5);

    // Garis balkon / cornice arsitektural
    detailPath += singleStroke(x - 3, top + 6, x + w + 3, top + 6, r, 3);
    for (let fy = top + 28; fy < GROUND - 14; fy += 32) {
      detailPath += singleStroke(x - 2, fy, x + w + 2, fy, r, 2.5);
    }

    // Ornamen atap sketsa (water tower, gable roof, antena)
    const roofRoll = r();
    if (roofRoll < 0.34 && w > 50) {
      strokePath += sketchWaterTower(x + 8 + r() * (w - 28), top, r);
    } else if (roofRoll < 0.65) {
      const ax = x + w * (0.28 + r() * 0.44);
      const ah = 24 + r() * 28;
      strokePath += penLine(ax, top, ax, top - ah, r, 2);
      if (r() < 0.55) {
        lamps.push({
          x: ax,
          y: top - ah,
          r: 2.8,
          accent: r() < 0.7,
          delay: r() * 4,
          rayPath: makeStarburst(ax, top - ah, 2.8, r),
        });
      }
    } else if (roofRoll < 0.85) {
      // Atap segitiga sketsa dengan garis konstruksi lewat
      const peakY = top - 16 - r() * 12;
      fillPath += `M${n(x)} ${n(top)}L${n(x + w / 2)} ${n(peakY)}L${n(x + w)} ${n(top)}Z`;
      strokePath +=
        penLine(x, top, x + w / 2, peakY, r, 5) +
        penLine(x + w / 2, peakY, x + w, top, r, 5);
    }

    // Jendela-jendela sketsa
    for (let wy = top + 12; wy < GROUND - 12; wy += 16) {
      for (let wx = x + 8; wx < x + w - 10; wx += 11.5) {
        const on = r() < 0.3;
        const accent = r() < 0.52;
        const win = makeWindow(wx, wy, 5.2, 7.2, on, accent, r);
        winFramePath += win.frame;
        if (win.glowRect && win.scribble) {
          litWins.push({ ...win.glowRect, accent: win.accent, blink: win.blink });
          if (win.accent) winScribbleAccent += win.scribble;
          else winScribblePaper += win.scribble;
        }
      }
    }

    x += w + 4 + r() * 8;
  }

  // Jalan raya sketsa, tiang lampu jalan klasik, dan arsir pantulan cahaya di jalan
  let streetSketch = "";
  let streetReflections = "";
  let lightTrails = "";

  // Cakrawala jalan dengan beberapa tarikan garis sketsa
  streetSketch += penLine(0, GROUND, W, GROUND, r, 12);
  streetSketch += singleStroke(0, GROUND + 6, W, GROUND + 6, r, 8);
  streetSketch += singleStroke(0, GROUND + 15, W, GROUND + 15, r, 6);
  streetSketch += singleStroke(0, GROUND + 26, W, GROUND + 26, r, 4);

  // Tiang lampu jalan & pancaran starburst sketsa
  for (let lx = 44; lx < W - 24; lx += 88 + r() * 36) {
    const poleTop = GROUND - 26;
    streetSketch +=
      singleStroke(lx, GROUND, lx, poleTop, r, 2) +
      `M${n(lx)} ${n(poleTop)}Q${n(lx + 5)} ${n(poleTop - 6)} ${n(lx + 10)} ${n(poleTop - 2)}`;
    const lampX = lx + 10;
    const lampY = poleTop - 2;
    const isAccent = r() < 0.65;
    lamps.push({
      x: lampX,
      y: lampY,
      r: 3.4,
      accent: isAccent,
      delay: r() * 6,
      rayPath: makeStarburst(lampX, lampY, 3.6, r),
    });

    // Arsir pantulan air horizontal di jalan tepat di bawah lampu
    for (let ry = GROUND + 4; ry < H - 3; ry += 4) {
      const rw = 8 + (ry - GROUND) * 0.65;
      streetReflections += singleStroke(lampX - rw / 2, ry, lampX + rw / 2, ry, r, 1);
    }
  }

  // Goresan cepat jejak lampu kendaraan (sketchy light trails)
  for (let i = 0; i < 16; i += 1) {
    const tx = r() * (W - 200);
    const tw = 70 + r() * 150;
    const ty = GROUND - 2 - (i % 3) * 2.8;
    lightTrails += singleStroke(tx, ty, tx + tw, ty, r, 4);
  }

  return {
    fillPath,
    strokePath,
    hatchPath,
    detailPath,
    winFramePath,
    winScribbleAccent,
    winScribblePaper,
    litWins,
    lamps,
    streetSketch,
    streetReflections,
    lightTrails,
  };
}

// Membangun Bulan / Matahari kompas arsitektural di langit atas (tidak terpotong, lengkap dengan garis konstruksi & arsir kawah/cahaya)
function buildCelestialAndSky() {
  const r = rng(2026);
  const cx = W * 0.78;
  const cy = 152; // Aman di bawah tombol Kembali ke atas, tidak tertutup dan tidak terpotong di atas
  const rad = 32;

  // Lingkaran bulan/matahari yang digambar tangan beberapa putaran (hand-drawn multi-loop circle)
  let orbLoops = "";
  for (let pass = 0; pass < 3; pass += 1) {
    const pr = rad + (pass - 1) * 1.4;
    const ox = (r() - 0.5) * 2;
    const oy = (r() - 0.5) * 2;
    orbLoops +=
      `M${n(cx + ox - pr)} ${n(cy + oy)}` +
      `C${n(cx + ox - pr)} ${n(cy + oy - pr * 0.56)} ${n(cx + ox - pr * 0.56)} ${n(cy + oy - pr)} ${n(cx + ox)} ${n(cy + oy - pr)}` +
      `C${n(cx + ox + pr * 0.56)} ${n(cy + oy - pr)} ${n(cx + ox + pr)} ${n(cy + oy - pr * 0.56)} ${n(cx + ox + pr)} ${n(cy + oy)}` +
      `C${n(cx + ox + pr)} ${n(cy + oy + pr * 0.56)} ${n(cx + ox + pr * 0.56)} ${n(cy + oy + pr)} ${n(cx + ox)} ${n(cy + oy + pr)}` +
      `C${n(cx + ox - pr * 0.56)} ${n(cy + oy + pr)} ${n(cx + ox - pr)} ${n(cy + oy + pr * 0.56)} ${n(cx + ox - pr)} ${n(cy + oy)}Z`;
  }

  // Arsir pensil di sisi bayangan bulan/matahari (crescent shading hatch)
  let orbHatch = "";
  for (let a = -rad + 5; a < rad - 5; a += 4.2) {
    const chord = Math.sqrt(Math.max(0, rad * rad - a * a));
    const xStart = cx - chord + 2;
    const xEnd = cx - chord * 0.15 + (r() - 0.5) * 4;
    orbHatch += `M${n(xStart)} ${n(cy + a)}L${n(xEnd)} ${n(cy + a + 3.5)}`;
  }

  // Garis bidik kompas arsitek & pancaran matahari/bulan sketsa
  const compassLines =
    singleStroke(cx - 72, cy, cx + 72, cy, r, 4) +
    singleStroke(cx, cy - 72, cx, cy + 72, r, 4) +
    singleStroke(cx - 48, cy - 48, cx + 48, cy + 48, r, 2) +
    singleStroke(cx - 48, cy + 48, cx + 48, cy - 48, r, 2);

  // Awan sketsa arsitektural di langit atas (sekitar teks Radja Admiral)
  let clouds = "";
  const cloudSpots = [
    { x: 210, y: 115, w: 150 },
    { x: 560, y: 88, w: 185 },
    { x: 980, y: 148, w: 160 },
    { x: 1410, y: 105, w: 135 },
  ];
  cloudSpots.forEach((c) => {
    const { x, y, w } = c;
    clouds +=
      singleStroke(x - 10, y, x + w + 10, y, r, 4) +
      singleStroke(x + 8, y + 5, x + w - 12, y + 5, r, 3) +
      `M${n(x)} ${n(y)}Q${n(x + w * 0.18)} ${n(y - 22)} ${n(x + w * 0.36)} ${n(y - 10)}` +
      `Q${n(x + w * 0.55)} ${n(y - 32)} ${n(x + w * 0.76)} ${n(y - 12)}` +
      `Q${n(x + w * 0.9)} ${n(y - 20)} ${n(x + w)} ${n(y)}`;
  });

  // Bintang sketsa (tanda silang pena & bintang 4-sudut di area langit atas hingga tengah)
  const stars = Array.from({ length: 46 }, () => {
    const sx = 24 + r() * (W - 48);
    const sy = 24 + r() * (H - 430);
    const sz = 1.2 + r() * 2.2;
    const isCross = r() < 0.55;
    const d = isCross
      ? `M${n(sx - sz * 2.6)} ${n(sy)}L${n(sx + sz * 2.6)} ${n(sy)}M${n(sx)} ${n(sy - sz * 2.6)}L${n(sx)} ${n(sy + sz * 2.6)}`
      : `M${n(sx - sz * 1.8)} ${n(sy - sz * 1.8)}L${n(sx + sz * 1.8)} ${n(sy + sz * 1.8)}M${n(sx - sz * 1.8)} ${n(sy + sz * 1.8)}L${n(sx + sz * 1.8)} ${n(sy - sz * 1.8)}`;
    return { sx, sy, sz, isCross, d, accent: r() < 0.38, blink: r() };
  });

  // Garis konstruksi arsitektur & perspektif penuh dari bagian atas footer hingga jalan bawah
  const constructionGrid = [
    `M0 ${n(cy)}H${W}`,
    `M${n(cx)} 0V${H}`,
    `M0 ${GROUND - 440}H${W}`,
    `M0 ${GROUND - 315}H${W}`,
    `M0 ${GROUND - 190}H${W}`,
    `M${n(W * 0.14)} 40V${H}`,
    `M${n(W * 0.43)} 40V${H}`,
    `M${n(W * 0.69)} 40V${H}`,
    // Garis perspektif diagonal halus dari titik bulan/matahari
    `M${n(cx)} ${n(cy)}L0 ${n(GROUND - 120)}`,
    `M${n(cx)} ${n(cy)}L${W} ${n(GROUND - 180)}`,
  ].join("");

  return { cx, cy, rad, orbLoops, orbHatch, compassLines, clouds, stars, constructionGrid };
}

const sky = buildCelestialAndSky();
const far = buildFarCity();
const near = buildNearCity();

export function Skyline() {
  return (
    <svg className="sky" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false">
      <defs>
        {/* Pendaran cahaya kota yang selaras dengan palet aksen & kertas situs */}
        <radialGradient id="sky-horizon-glow" cx="50%" cy="95%" r="65%">
          <stop offset="0%" stopColor="var(--sky-accent)" stopOpacity="0.2" />
          <stop offset="50%" stopColor="var(--sky-lit)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--sky-lit)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sky-orb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sky-accent)" stopOpacity="0.32" />
          <stop offset="55%" stopColor="var(--sky-lit)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--sky-lit)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Pendaran atmosferik dari cakrawala kota */}
      <rect x="0" y="0" width={W} height={H} fill="url(#sky-horizon-glow)" />

      {/* Garis bantu sketsa arsitek (blueprint/construction grid) di seluruh latar footer */}
      <path className="sky-guide" d={sky.constructionGrid} />

      {/* Awan goresan pena tipis di bagian atas (area teks Radja Admiral) */}
      <path className="sky-clouds" d={sky.clouds} />

      {/* Bulan / Matahari kompas arsitektural utuh (tidak terpotong di atas) */}
      <g className="sky-celestial">
        <circle cx={sky.cx} cy={sky.cy} r={88} fill="url(#sky-orb-glow)" />
        <circle className="sky-orb-ring sky-orb-dash" cx={sky.cx} cy={sky.cy} r={54} />
        <circle className="sky-orb-ring" cx={sky.cx} cy={sky.cy} r={42} />
        <path className="sky-compass" d={sky.compassLines} />
        <circle className="sky-orb-core" cx={sky.cx} cy={sky.cy} r={sky.rad - 1} />
        <path className="sky-orb-hatch" d={sky.orbHatch} />
        <path className="sky-orb-sketch" d={sky.orbLoops} />
      </g>

      {/* Bintang-bintang goresan pena di langit */}
      <g className="sky-stars">
        {sky.stars.map((s, i) => (
          <path
            key={i}
            d={s.d}
            className={s.accent ? "sky-star-accent" : "sky-star-paper"}
            style={{ animationDelay: `${(-s.blink * 5).toFixed(2)}s` }}
          />
        ))}
      </g>

      {/* Lapisan kota jauh (siluet tipis, garis sketsa, dan arsir vertikal) */}
      <path className="sky-far" d={far.fillPath} />
      <path className="sky-far-hatch" d={far.hatchPath} />
      <path className="sky-far-stroke" d={far.strokePath} />

      {/* Lapisan kota utama (penutup siluet, arsir bayangan cross-hatch, detail lantai, dan goresan pena ganda) */}
      <path className="sky-near" d={near.fillPath} />
      <path className="sky-hatch" d={near.hatchPath} />
      <path className="sky-detail" d={near.detailPath} />
      <path className="sky-sketch" d={near.strokePath} />

      {/* Bingkai jendela sketsa & pendaran lampu jendela */}
      <path className="sky-win-frame" d={near.winFramePath} />
      <g className="sky-win-lit">
        {near.litWins.map((w, i) => (
          <rect
            key={i}
            x={w.x}
            y={w.y}
            width={w.w}
            height={w.h}
            rx={0.5}
            className={`${w.accent ? "lit-accent" : "lit-paper"}${w.blink < 0.16 ? " blink" : ""}`}
            style={w.blink < 0.16 ? { animationDelay: `${(-w.blink * 55).toFixed(2)}s` } : undefined}
          />
        ))}
      </g>
      {/* Goresan arsir cahaya di dalam jendela yang menyala */}
      <path className="sky-win-scribble-accent" d={near.winScribbleAccent} />
      <path className="sky-win-scribble-paper" d={near.winScribblePaper} />

      {/* Jalan raya, tiang lampu, jejak cahaya kendaraan, dan arsir pantulan jalan */}
      <path className="sky-street" d={near.streetSketch} />
      <path className="sky-trails" d={near.lightTrails} />
      <path className="sky-reflect" d={near.streetReflections} />

      {/* Pancaran starburst sketsa pada lampu jalan & puncak gedung */}
      <g className="sky-lamps">
        {near.lamps.map((l, i) => (
          <g
            key={i}
            className={l.accent ? "lamp-accent" : "lamp-paper"}
            style={{ animationDelay: `${(-l.delay).toFixed(2)}s` }}
          >
            <circle className="lamp-halo" cx={n(l.x)} cy={n(l.y)} r={n(l.r * 3.4)} />
            <path className="lamp-rays" d={l.rayPath} />
            <circle className="lamp-core" cx={n(l.x)} cy={n(l.y)} r={n(l.r * 0.85)} />
          </g>
        ))}
      </g>
    </svg>
  );
}
