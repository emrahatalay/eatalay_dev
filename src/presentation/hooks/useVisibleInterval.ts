"use client";

import { type RefObject, useEffect, useRef } from "react";

/**
 * Calls `onTick` every `ms` while `target` is on screen. Never starts for
 * people who asked for reduced motion, so decorative loops stay still.
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
    const start = () => {
      if (timer === undefined) timer = window.setInterval(() => tick.current(), ms);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };

    const observer = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()));
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [target, ms]);
}
