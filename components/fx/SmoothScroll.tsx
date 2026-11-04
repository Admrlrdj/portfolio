"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { SCROLL_EVENT } from "@/lib/scroll";

// Bagian dirapatkan ke tepi atas layar; navbar melayang di atasnya, jadi garis bawah bagian sebelumnya tidak terlihat.
const HEADER_OFFSET = 0;

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });

    const goTo = (hash: string) => {
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (!target) return false;
      lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.1 });
      return true;
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      if (!goTo(url.hash)) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
    };

    const onCustom = (e: Event) => {
      const hash = (e as CustomEvent<string>).detail;
      if (goTo(hash)) {
        e.preventDefault();
        history.pushState(null, "", hash);
      }
    };

    document.addEventListener("click", onClick);
    window.addEventListener(SCROLL_EVENT, onCustom);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener(SCROLL_EVENT, onCustom);
      lenis.destroy();
    };
  }, []);

  return null;
}
