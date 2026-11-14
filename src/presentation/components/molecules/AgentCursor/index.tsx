"use client";

import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import { useVisibleInterval } from "@/presentation/hooks/useVisibleInterval";
import { cx } from "@/shared/lib/cx";
import styles from "./AgentCursor.module.css";

/** Time the cursor takes to glide to the next target; matches the CSS transition. */
const GLIDE_MS = 900;

export interface AgentCursorProps {
  /** Name on the tag that trails the cursor, e.g. "faq-agent". */
  readonly label: string;
  /** How long it rests on each target before moving on. */
  readonly every?: number;
  /** The agent's colour; the target it works on is outlined in it too. Defaults to the accent. */
  readonly color?: string;
  /** Wander between targets in random order instead of walking them top to bottom. */
  readonly random?: boolean;
  readonly className?: string;
}

/**
 * An agent's cursor that glides between the elements marked `data-agent-target`
 * inside its parent (which must be positioned), clicks, and marks the one it
 * rests on with `data-agent-active` so the target can light up. Several agents
 * can share a parent: each claims its target, so two never land on the same one.
 * Decorative: hidden from assistive tech, never takes clicks, and stays still
 * for people who asked for reduced motion.
 */
export function AgentCursor({ label, every = 2800, color, random = false, className }: AgentCursorProps) {
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);
  const index = useRef(-1);
  const active = useRef<HTMLElement | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [clicks, setClicks] = useState(0);

  // Lets go of the current target, unless another agent has taken it since.
  const release = () => {
    const el = active.current;
    if (el?.getAttribute("data-agent-claim") === id) {
      el.removeAttribute("data-agent-claim");
      el.removeAttribute("data-agent-active");
      el.style.removeProperty("--agent-color");
    }
    active.current = null;
  };

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      release();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useVisibleInterval(ref, every, () => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const targets = Array.from(host.querySelectorAll<HTMLElement>("[data-agent-target]"));
    if (targets.length === 0) return;

    const previous = active.current;
    release();
    const free = targets.filter((el) => !el.hasAttribute("data-agent-claim") && el !== previous);
    if (free.length === 0) return;

    let target: HTMLElement;
    if (random) {
      target = free[Math.floor(Math.random() * free.length)]!;
    } else {
      index.current = (index.current + 1) % targets.length;
      target = free.find((el) => targets.indexOf(el) >= index.current) ?? free[0]!;
      index.current = targets.indexOf(target);
    }
    target.setAttribute("data-agent-claim", id);
    active.current = target;

    // Positions are read on every move, so opened answers or a resize never leave it behind.
    const box = host.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    setPos({
      x: rect.left - box.left + Math.max(8, Math.min(rect.width * 0.62, rect.width - 48)),
      y: rect.top - box.top + Math.min(rect.height * 0.5, 40),
    });

    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (active.current !== target) return;
      target.setAttribute("data-agent-active", "");
      if (color) target.style.setProperty("--agent-color", color);
      setClicks((n) => n + 1);
    }, GLIDE_MS);
  });

  const style = {
    ...(pos ? { "--x": `${pos.x}px`, "--y": `${pos.y}px` } : {}),
    ...(color ? { "--agent": color } : {}),
  } as CSSProperties;

  return (
    <span ref={ref} className={cx(styles.cursor, pos && styles.on, className)} style={style} aria-hidden="true">
      {clicks > 0 && <i key={clicks} className={styles.click} />}
      <svg viewBox="0 0 16 18">
        <path d="M1 1l13 6.5-5.6 1.7L6 15z" />
      </svg>
      <b>{label}</b>
    </span>
  );
}
