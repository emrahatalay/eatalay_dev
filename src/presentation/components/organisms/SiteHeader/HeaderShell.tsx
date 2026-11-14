"use client";

import { type ReactNode, useEffect, useState } from "react";

/* Hysteresis so the bar doesn't flicker around a single threshold. */
const PIN_AT = 96;
const UNPIN_AT = 24;

/**
 * Wraps the header bar and flags it once the page scrolls: CSS then pins it
 * to the top and widens it to the full viewport. Back at the top it settles
 * into the hero again.
 */
export function HeaderShell({
  className,
  children,
}: {
  readonly className: string;
  readonly children: ReactNode;
}) {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setPinned((was) => (was ? y > UNPIN_AT : y > PIN_AT));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={className} data-pinned={pinned || undefined}>
      {children}
    </div>
  );
}
