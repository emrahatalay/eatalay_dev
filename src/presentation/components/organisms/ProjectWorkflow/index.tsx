import { useTranslations } from "next-intl";
import type { ProjectWorkflow as Workflow } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import { RichHeadline } from "@/presentation/components/molecules/RichHeadline";
import styles from "./ProjectWorkflow.module.css";

/** How the project is made with AI agents. */
export function ProjectWorkflow({ workflow }: { readonly workflow: Workflow }) {
  const t = useTranslations("Project");

  return (
    <section className={styles.workflow} aria-labelledby="workflow-title">
      <div className={styles.head}>
        <Chip>{t("workflowEyebrow")}</Chip>
        <RichHeadline id="workflow-title" text={workflow.headline} className={styles.headline} />
        <p className={`${styles.intro} reveal`}>{workflow.intro}</p>
      </div>

      <ol className={styles.steps}>
        {workflow.steps.map((step, i) => (
          <li key={step.title} className={`${styles.step} reveal`}>
            <span className={styles.index} aria-hidden="true">
              {i + 1}
            </span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.text}>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
