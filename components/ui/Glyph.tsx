export type GlyphKind = "cv" | "layers" | "send" | "download" | "external" | "copy" | "check";

const paths: Record<GlyphKind, string> = {
  cv: "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 15h5M10 18h3",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5",
  send: "M3 11l18-8-8 18-2-8z",
  download: "M12 4v11M7 11l5 5 5-5M5 20h14",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  copy: "M9 9h11v11H9zM5 15V4h11",
  check: "M5 13l4 4 10-10",
};

export function Glyph({ kind, className = "h-5 w-5" }: { kind: GlyphKind; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={`btn-glyph shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[kind]} />
    </svg>
  );
}
