"use client";

import { type RefObject, useEffect, useRef } from "react";

/**
 * Calls `onTick` every `ms` while `target` is on screen and the tab is in
 * front. Never starts for people who asked for reduced motion, so decorative
 * loops stay still.
 */
export function useVisibleInterval(target: RefObject<Element | null>, ms: number, onTick: () => void) {
  const tick = useRef(onTick);

  useEffect(() => {
    tick.current = onTick;
  });

  useEffect(() => {
    const el = target.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    let onScreen = false;
    const sync = () => {
      const run = onScreen && !document.hidden;
      if (run && timer === undefined) timer = window.setInterval(() => tick.current(), ms);
      if (!run && timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? false;
      sync();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.clearInterval(timer);
    };
  }, [target, ms]);
}
