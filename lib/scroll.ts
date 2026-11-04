export const SCROLL_EVENT = "portfolio:scroll";

// SmoothScroll menangani event ini dan memanggil preventDefault; tanpa itu (reduced-motion) pakai hash biasa.
export function scrollToHash(hash: string) {
  const handled = !window.dispatchEvent(new CustomEvent(SCROLL_EVENT, { detail: hash, cancelable: true }));
  if (!handled) window.location.hash = hash;
}
