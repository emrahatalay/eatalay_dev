"use client";

import { type ReactNode, useRef, useState } from "react";
import { useVisibleInterval } from "@/presentation/hooks/useVisibleInterval";
import { cx } from "@/shared/lib/cx";
import styles from "./AgentScene.module.css";

export interface AgentSceneLabels {
  readonly operator: string;
  readonly operatorRole: string;
  readonly prompt: string;
  readonly approve: string;
  readonly approved: string;
  readonly coder: string;
  readonly tester: string;
  readonly reviewer: string;
  readonly deploy: string;
  readonly idle: string;
  readonly writing: string;
  readonly testing: string;
  readonly reviewing: string;
  readonly waiting: string;
  readonly shipping: string;
  readonly done: string;
  readonly passed: string;
  readonly live: string;
}

/**
 * One loop of the workflow, a step at a time:
 * 0 brief · 1 code · 2 test · 3 review · 4 human approval · 5 release · 6 live.
 */
const STEPS = 7;
const STEP_MS = 2000;

type NodeState = "idle" | "busy" | "done";

/** Where a node stands at a step: idle before `start`, busy until `end`, then done. */
function stateAt(step: number, start: number, end = start + 1): NodeState {
  if (step < start) return "idle";
  return step < end ? "busy" : "done";
}

/* Wires in % of the scene: brief to the coder, down the agent column, approval
   back to the human, and the reviewed work out to release. */
const WIRES = {
  brief: "M26 50 C31 50 31 14 36 14",
  toTest: "M50 24 L50 40",
  toReview: "M50 60 L50 76",
  approval: "M36 86 C31 86 31 50 26 50",
  release: "M64 86 C69 86 69 50 74 50",
} as const;

const WIRE_STEP: Record<keyof typeof WIRES, number> = { brief: 1, toTest: 2, toReview: 3, approval: 4, release: 5 };

/**
 * Faint hero backdrop: a person steers a team of AI agents that write, test
 * and review code, approves the result, and it ships. Decorative only.
 */
export function AgentScene({ labels }: { readonly labels: AgentSceneLabels }) {
  const [step, setStep] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  // Only runs while the hero is on screen.
  useVisibleInterval(root, STEP_MS, () => setStep((s) => (s + 1) % STEPS));

  const coder = stateAt(step, 1);
  const tester = stateAt(step, 2);
  const reviewer = stateAt(step, 3, 5);
  const deploy = stateAt(step, 5);

  return (
    <div ref={root} className={styles.scene} aria-hidden="true" data-motion="">
      <svg className={styles.wires} viewBox="0 0 100 100" preserveAspectRatio="none">
        {(Object.keys(WIRES) as (keyof typeof WIRES)[]).map((key) => (
          <g key={key} className={cx(key === "approval" && styles.dashed)}>
            <path d={WIRES[key]} className={styles.wire} />
            {step === WIRE_STEP[key] && <path d={WIRES[key]} pathLength={100} className={styles.pulse} />}
          </g>
        ))}
      </svg>

      {/* The human: writes the brief, approves the review. */}
      <div className={cx(styles.node, styles.operator, (step === 0 || step === 4) && styles.busy)}>
        <span className={styles.head}>
          <i className={styles.avatar}>EA</i>
          <span className={styles.who}>
            <b>{labels.operator}</b>
            <small>{labels.operatorRole}</small>
          </span>
        </span>
        <span className={styles.prompt}>
          <span className={cx(styles.promptText, step === 0 && styles.typing)}>{labels.prompt}</span>
        </span>
        <span className={cx(styles.approve, step === 4 && styles.approveHot, step >= 5 && styles.approveDone)}>
          {step >= 5 ? `✓ ${labels.approved}` : labels.approve}
          {step === 4 && (
            <svg className={styles.cursor} viewBox="0 0 16 18">
              <path d="M1 1l13 6.5-5.6 1.7L6 15z" />
            </svg>
          )}
        </span>
      </div>

      <Agent
        className={styles.coder}
        name={labels.coder}
        state={coder}
        status={{ idle: labels.idle, busy: labels.writing, done: labels.done }}
      >
        <span className={styles.code}>
          <i style={{ width: "72%" }} />
          <i style={{ width: "48%", marginLeft: "12%" }} />
          <i style={{ width: "60%", marginLeft: "12%" }} />
        </span>
      </Agent>

      <Agent
        className={styles.tester}
        name={labels.tester}
        state={tester}
        status={{ idle: labels.idle, busy: labels.testing, done: labels.passed }}
      >
        <span className={styles.checks}>
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} style={{ transitionDelay: tester === "busy" ? `${i * 0.12}s` : "0s" }} />
          ))}
        </span>
      </Agent>

      <Agent
        className={styles.reviewer}
        name={labels.reviewer}
        state={reviewer}
        status={{ idle: labels.idle, busy: step === 4 ? labels.waiting : labels.reviewing, done: labels.done }}
      >
        <span className={styles.diff}>
          <i data-sign="+" />
          <i data-sign="−" />
        </span>
      </Agent>

      <div className={cx(styles.node, styles.deploy, styles[deploy])}>
        <span className={styles.head}>
          <i className={styles.glyph}>
            <svg viewBox="0 0 16 16">
              <path d="M8 1.5c2.6 1.7 3.9 4.3 3.5 7.6L8 12.5 4.5 9.1C4.1 5.8 5.4 3.2 8 1.5zM5 11l-2 3.5 3.2-1M11 11l2 3.5-3.2-1" />
            </svg>
          </i>
          <b>{labels.deploy}</b>
        </span>
        <span className={styles.bar}>
          <i />
        </span>
        <span className={styles.status}>
          {deploy === "done" && <i className={styles.liveDot} />}
          {deploy === "done" ? labels.live : deploy === "busy" ? labels.shipping : labels.idle}
        </span>
      </div>
    </div>
  );
}

function Agent({
  className,
  name,
  state,
  status,
  children,
}: {
  readonly className: string;
  readonly name: string;
  readonly state: NodeState;
  readonly status: Record<NodeState, string>;
  readonly children: ReactNode;
}) {
  return (
    <div className={cx(styles.node, styles.agent, className, styles[state])}>
      <span className={styles.head}>
        <i className={styles.glyph}>
          <svg viewBox="0 0 16 16">
            <path d="M8 1l1.6 4.4L14 7l-4.4 1.6L8 13l-1.6-4.4L2 7l4.4-1.6z" />
          </svg>
        </i>
        <b>{name}</b>
      </span>
      {children}
      <span className={styles.status}>
        {state === "done" && "✓ "}
        {status[state]}
      </span>
    </div>
  );
}
