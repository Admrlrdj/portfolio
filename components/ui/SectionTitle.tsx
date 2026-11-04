import type { ReactNode } from "react";
import { IsoIcon, type IsoKind } from "./IsoIcon";
import { Reveal } from "./Reveal";

type Props = { id: string; icon: IsoKind; children: ReactNode };

export function SectionTitle({ id, icon, children }: Props) {
  return (
    <Reveal className="flex items-center gap-3">
      <span className="iso-pop shrink-0">
        <IsoIcon kind={icon} className="h-12 w-12" />
      </span>
      <h2 id={id} className="h-section">
        {children}
      </h2>
    </Reveal>
  );
}
