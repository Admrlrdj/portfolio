import type { ReactNode } from "react";
import type { Bi } from "@/lib/i18n";

// Merender kedua bahasa; CSS menyembunyikan yang tidak aktif (lihat .l-id/.l-en di globals.css).
// Aman dipakai di komponen server dan tidak menimbulkan beda hidrasi.
export function T({ id, en }: { id: ReactNode; en: ReactNode }) {
  return (
    <>
      <span lang="id" className="l-id">
        {id}
      </span>
      <span lang="en" className="l-en">
        {en}
      </span>
    </>
  );
}

export function TV({ v }: { v: Bi }) {
  return <T id={v.id} en={v.en} />;
}
