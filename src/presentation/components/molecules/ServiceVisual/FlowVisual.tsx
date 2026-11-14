import type { CSSProperties } from "react";
import type { FlowVisual as FlowVisualData } from "@/core/domain/entities";
import { cx } from "@/shared/lib/cx";
import styles from "./ServiceVisual.module.css";

/** Node centres in % of the frame; the wires below join them centre to centre. */
const OUTPUT_Y = [34, 58, 82] as const;
const IN_WIRE = "M17 58 L48 58";
const outWire = (y: number) => `M48 58 C66 58 64 ${y} 83 ${y}`;

/**
 * An automation graph that runs on a loop: a pulse leaves the trigger,
 * the agent lights up, then the work fans out to each tool.
 */
export function FlowVisual({ visual }: { readonly visual: FlowVisualData }) {
  return (
    <div className={cx(styles.frame, styles.flow)} data-motion="">
      <span className={styles.runs}>
        <i />
        {visual.runs}
      </span>

      <svg className={styles.wires} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d={IN_WIRE} className={styles.wireLine} />
        <path d={IN_WIRE} pathLength={100} className={cx(styles.pulse, styles.pulseIn)} />
        {OUTPUT_Y.map((y, i) => (
          <g key={y}>
            <path d={outWire(y)} className={styles.wireLine} />
            <path
              d={outWire(y)}
              pathLength={100}
              className={cx(styles.pulse, styles.pulseOut)}
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          </g>
        ))}
      </svg>

      <span className={cx(styles.node, styles.trigger)}>
        <i className={styles.glyph}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M9 1L3 9h4l-1 6 6-8H8z" />
          </svg>
        </i>
        {visual.trigger}
      </span>

      <span className={cx(styles.node, styles.agentNode)}>
        <i className={styles.glyph}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 1l1.6 4.4L14 7l-4.4 1.6L8 13l-1.6-4.4L2 7l4.4-1.6z" />
          </svg>
        </i>
        <span>
          <b>{visual.agent.name}</b>
          <small>{visual.agent.task}</small>
        </span>
      </span>

      <ul className={styles.outputs}>
        {visual.outputs.map((name, i) => (
          <li
            key={name}
            className={cx(styles.node, styles.output)}
            style={{ top: `${OUTPUT_Y[i]}%`, "--delay": `${i * 0.12}s` } as CSSProperties}
          >
            <i className={styles.glyph}>{name.charAt(0)}</i>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
