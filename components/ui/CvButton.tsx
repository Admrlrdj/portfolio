import Link from "next/link";
import { Magnetic } from "@/components/fx/Magnetic";
import { Glyph } from "./Glyph";
import { T } from "@/components/i18n/T";

export function CvButton() {
  return (
    <Magnetic>
      <Link href="/cv" className="btn-live btn-live-accent">
        <Glyph kind="cv" />
        <T id="Lihat CV" en="View CV" />
      </Link>
    </Magnetic>
  );
}
