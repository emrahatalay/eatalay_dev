import type { CSSProperties, ReactNode } from "react";
import type { ProcessStepIcon, ProcessVisual as ProcessVisualData } from "@/core/domain/entities";
import { cx } from "@/shared/lib/cx";
import styles from "./ServiceVisual.module.css";

const ICONS: Record<ProcessStepIcon, ReactNode> = {
  research: (
    <>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </>
  ),
  design: (
    <>
      <rect x="2" y="2" width="12" height="12" rx="2.5" />
      <path d="M2 6h12M6 6v8" />
    </>
  ),
  architecture: (
    <>
      <path d="M8 2l6 3-6 3-6-3z" />
      <path d="M2 8.5l6 3 6-3M2 11.5l6 3 6-3" />
    </>
  ),
  build: (
    <>
      <path d="M5.5 4.5L2 8l3.5 3.5M10.5 4.5L14 8l-3.5 3.5" />
    </>
  ),
  review: (
    <>
      <circle cx="8" cy="5" r="2.75" />
      <path d="M3 14c.6-2.6 2.6-4 5-4s4.4 1.4 5 4" />
    </>
  ),
  release: (
    <>
      <path d="M8 13V3M4 7l4-4 4 4" />
    </>
  ),
};

/**
 * Six steps every project goes through, whatever the discipline. The steps
 * light up in order on a loop; the chips on top name the disciplines they serve.
 */
export function ProcessVisual({ visual }: { readonly visual: ProcessVisualData }) {
  const total = visual.steps.length;

  return (
    <div className={cx(styles.frame, styles.process)} data-motion="">
      <div className={styles.processHead}>
        <span className={styles.runs}>
          <i />
          {visual.scope}
        </span>
        <ul className={styles.applies} aria-label={visual.scope}>
          {visual.appliesTo.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>

      <ol className={styles.steps} style={{ "--n": total } as CSSProperties}>
        {visual.steps.map((step, i) => (
          <li key={step.label} className={styles.stepCard} style={{ "--i": i } as CSSProperties}>
            <span className={styles.stepTop}>
              <i className={styles.glyph}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  {ICONS[step.icon]}
                </svg>
              </i>
              <span className={styles.stepNo}>{String(i + 1).padStart(2, "0")}</span>
            </span>
            <b>{step.label}</b>
            <small>{step.detail}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}
