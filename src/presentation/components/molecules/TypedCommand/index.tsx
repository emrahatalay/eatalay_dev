"use client";

import { useRef, useState } from "react";
import { useVisibleInterval } from "@/presentation/hooks/useVisibleInterval";

/* The steps of the workflow, typed one after another at the prompt. */
const COMMANDS = ["ship --next", "agents run", "review --human", "deploy --live"] as const;

/** Longest command, in characters: the line is sized to it so nothing shifts while typing. */
const COMMAND_WIDTH = Math.max(...COMMANDS.map((c) => c.length));

const TICK_MS = 70;
/* Pauses, in ticks. */
const HOLD = 32;
const EMPTY = 6;

interface State {
  readonly index: number;
  readonly length: number;
  readonly deleting: boolean;
  readonly wait: number;
}

function step(s: State): State {
  if (s.wait > 0) return { ...s, wait: s.wait - 1 };
  const full = COMMANDS[s.index]!.length;

  if (!s.deleting) {
    return s.length < full ? { ...s, length: s.length + 1, wait: s.length + 1 === full ? HOLD : 0 } : { ...s, deleting: true };
  }
  if (s.length > 0) return { ...s, length: s.length - 1 };
  return { index: (s.index + 1) % COMMANDS.length, length: 0, deleting: false, wait: EMPTY };
}

/**
 * A command line that keeps working: it types a command, holds it, clears it
 * and moves on. Renders the first command complete until it is on screen.
 */
export function TypedCommand({
  className,
  cursorClassName,
}: {
  readonly className?: string;
  readonly cursorClassName?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<State>({ index: 0, length: COMMANDS[0].length, deleting: false, wait: HOLD });

  // Erases faster than it types.
  useVisibleInterval(root, TICK_MS, () => setState((s) => (s.deleting ? step(step(s)) : step(s))));

  return (
    <span ref={root} className={className} style={{ width: `${COMMAND_WIDTH + 1}ch` }}>
      {COMMANDS[state.index]!.slice(0, state.length)}
      <span className={cursorClassName} />
    </span>
  );
}
