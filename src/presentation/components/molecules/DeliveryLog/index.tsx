"use client";

import { useRef, useState } from "react";
import { useVisibleInterval } from "@/presentation/hooks/useVisibleInterval";
import type { AboutContent } from "@/core/domain/entities";
import { cx } from "@/shared/lib/cx";
import styles from "./DeliveryLog.module.css";

const VISIBLE = 5;
const TICK_MS = 2400;

/**
 * A delivery log that keeps moving: agents finish work, a person signs it off,
 * newest on top. Decorative; the section copy says the same thing in words.
 */
export function DeliveryLog({ log }: { readonly log: AboutContent["log"] }) {
  const [tick, setTick] = useState(VISIBLE - 1);
  const root = useRef<HTMLDivElement>(null);
  const total = log.entries.length;

  useVisibleInterval(root, TICK_MS, () => setTick((t) => t + 1));

  // Newest first; keys are absolute so only the new row animates in.
  const rows = Array.from({ length: VISIBLE }, (_, k) => {
    const id = tick - k;
    return { id, entry: log.entries[((id % total) + total) % total]! };
  });

  return (
    <div ref={root} className={styles.log} aria-hidden="true" data-motion="">
      <span className={styles.head}>
        <b>{log.title}</b>
        <i className={styles.live} />
      </span>

      <ol className={styles.rows}>
        {rows.map(({ id, entry }, k) => (
          <li key={id} className={cx(styles.row, entry.by === "human" && styles.human, k === 0 && styles.fresh)}>
            <span className={styles.avatar}>
              {entry.by === "human" ? (
                "EA"
              ) : (
                <svg viewBox="0 0 16 16">
                  <path d="M8 1l1.6 4.4L14 7l-4.4 1.6L8 13l-1.6-4.4L2 7l4.4-1.6z" />
                </svg>
              )}
            </span>
            <span className={styles.text}>
              <span>{entry.text}</span>
              <small>{entry.by === "human" ? log.human : log.agent}</small>
            </span>
            <span className={styles.tag}>
              {entry.by === "human" && "✓ "}
              {entry.tag}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
