"use client";

import { useEffect } from "react";

/* Start a loop a little before it scrolls in, so it is already moving when seen. */
const MARGIN = "120px 0px";

/**
 * Pauses decorative CSS loops while they are off screen. Any element marked
 * `data-motion` gets `data-offscreen` when it leaves the viewport, and the
 * global stylesheet pauses every animation inside it. Renders nothing.
 */
export function MotionGate() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting);
      },
      { rootMargin: MARGIN },
    );
    for (const el of document.querySelectorAll("[data-motion]")) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return null;
}
