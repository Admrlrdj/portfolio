import type { CSSProperties } from "react";

type Props = { text: string; className?: string };

export function SplitText({ text, className = "" }: Props) {
  let index = 0;
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={`${word}-${w}`}>
            <span className="inline-block whitespace-nowrap">
              {[...word].map((ch) => {
                const i = index++;
                return (
                  <span key={i} className="split-char" style={{ "--i": i } as CSSProperties}>
                    {ch}
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </span>
  );
}
