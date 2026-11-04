import {
  siClaude,
  siCodeigniter,
  siCss,
  siExpress,
  siFastapi,
  siFlutter,
  siFramer,
  siGit,
  siGithub,
  siGo,
  siGooglegemini,
  siGreensock,
  siJquery,
  siHtml5,
  siJavascript,
  siLaravel,
  siLeaflet,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenapiinitiative,
  siPhp,
  siPostgresql,
  siPython,
  siRailway,
  siReact,
  siSap,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siUltralytics,
  siVercel,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";

// Ikon buatan sendiri (garis 24x24) untuk teknologi dan keahlian yang tidak punya logo di simple-icons,
// termasuk OpenAI yang sudah dihapus dari paketnya (simpul enam sisi yang meniru bentuknya).
const customArt = {
  openai: [0, 60, 120].map((deg) => <rect key={deg} x="7.6" y="2.2" width="8.8" height="19.6" rx="4.4" transform={`rotate(${deg} 12 12)`} />),
  csharp: (
    <>
      <path d="M12 2.5l8.3 4.75v9.5L12 21.5l-8.3-4.75v-9.5z" />
      <path d="M11 9.6a3.2 3.2 0 1 0 0 4.8" />
      <path d="M15 9.5v5M17.5 9.5v5M14 11h4.6M14 13h4.6" strokeWidth="1.3" />
    </>
  ),
  rest: (
    <>
      <path d="M7 4c-2 0-2.5 1-2.5 2.5v2.5L3 12l1.5 3v2.5C4.5 19 5 20 7 20M17 4c2 0 2.5 1 2.5 2.5v2.5L21 12l-1.5 3v2.5c0 1.5-.5 2.5-2.5 2.5" />
      <path d="M8.5 10h6.5l-2-2M15.5 14H9l2 2" />
    </>
  ),
  lenis: (
    <>
      <rect x="7" y="2.5" width="10" height="16" rx="5" />
      <path d="M12 6v3.5" />
      <path d="M4 21.5c2.7-1.6 5.3-1.6 8 0s5.3 1.6 8 0" />
    </>
  ),
  recharts: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 17v-4M11 17V9M15 17v-6M19 17V6" strokeWidth="2.2" />
      <path d="M6 9.5l4-3.5 4 2.5 5-5" strokeWidth="1.3" />
    </>
  ),
  slick: (
    <>
      <rect x="7" y="5" width="10" height="13" rx="1.5" />
      <path d="M4 7.5v8M20 7.5v8" />
      <path d="M2.5 11.5l-1 0M22.5 11.5l-1 0" />
      <circle cx="10" cy="21" r=".6" fill="currentColor" />
      <circle cx="12" cy="21" r=".6" fill="currentColor" />
      <circle cx="14" cy="21" r=".6" fill="currentColor" />
    </>
  ),
  pm: (
    <>
      <rect x="3" y="3.5" width="18" height="17" rx="2" />
      <path d="M3 8h18" />
      <path d="M6 11.5h7M9 14.5h8M7 17.5h5" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  qa: (
    <>
      <path d="M12 2.5l7.5 3v6c0 4.6-3.2 8.2-7.5 10-4.3-1.8-7.5-5.4-7.5-10v-6z" />
      <path d="M8.3 12.2l2.6 2.6 4.9-5.4" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  docs: (
    <>
      <path d="M6 2.5h8.5L19 7v14.5H6z" />
      <path d="M14 2.5V7h5" />
      <path d="M10.5 11.5L8.5 14l2 2.5M14.5 11.5l2 2.5-2 2.5" strokeLinecap="round" />
    </>
  ),
} as const;

type CustomIcon = { path: ""; custom: keyof typeof customArt };
const custom = (key: keyof typeof customArt): CustomIcon => ({ path: "", custom: key });
export type AnyIcon = SimpleIcon | CustomIcon;

const rules: [RegExp, AnyIcon][] = [
  [/^next/i, siNextdotjs],
  [/^react native/i, siReact],
  [/^react/i, siReact],
  [/typescript/i, siTypescript],
  [/tailwind/i, siTailwindcss],
  [/^python/i, siPython],
  [/fastapi/i, siFastapi],
  [/^go$/i, siGo],
  [/mongodb/i, siMongodb],
  [/supabase/i, siSupabase],
  [/postgres/i, siPostgresql],
  [/vercel/i, siVercel],
  [/railway/i, siRailway],
  [/wordpress|wplms/i, siWordpress],
  [/^php$/i, siPhp],
  [/laravel/i, siLaravel],
  [/codeigniter/i, siCodeigniter],
  [/gsap/i, siGreensock],
  [/framer/i, siFramer],
  [/leaflet/i, siLeaflet],
  [/javascript/i, siJavascript],
  [/html/i, siHtml5],
  [/css3|^css/i, siCss],
  [/^git$/i, siGit],
  [/github/i, siGithub],
  [/openapi/i, siOpenapiinitiative],
  [/yolo|ultralytics/i, siUltralytics],
  [/sap/i, siSap],
  [/claude/i, siClaude],
  [/chatgpt|codex|openai/i, custom("openai")],
  [/^c#$/i, custom("csharp")],
  [/restful|rest api/i, custom("rest")],
  [/^lenis$/i, custom("lenis")],
  [/recharts/i, custom("recharts")],
  [/^slick$/i, custom("slick")],
  [/manajemen proyek/i, custom("pm")],
  [/quality assurance/i, custom("qa")],
  [/dokumentasi/i, custom("docs")],
  [/^mysql/i, siMysql],
  [/jquery/i, siJquery],
  [/gemini/i, siGooglegemini],
  [/flutter/i, siFlutter],
  [/^node/i, siNodedotjs],
  [/^express/i, siExpress],
];

export function iconFor(label: string): AnyIcon | null {
  const hit = rules.find(([re]) => re.test(label.trim()));
  return hit ? hit[1] : null;
}

export function TechIcon({ icon, className = "h-4 w-4" }: { icon: AnyIcon; className?: string }) {
  if ("custom" in icon) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={`${className} shrink-0`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
        {customArt[icon.custom]}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={`${className} shrink-0 fill-current`}>
      <path d={icon.path} />
    </svg>
  );
}

export function TechChip({ label }: { label: string }) {
  const icon = iconFor(label);
  return (
    <span className="chip mono">
      {icon && <TechIcon icon={icon} />}
      {label}
    </span>
  );
}
