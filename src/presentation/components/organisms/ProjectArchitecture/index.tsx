import { useTranslations } from "next-intl";
import type { ProjectArchitecture as Architecture } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import { CodeBlock } from "@/presentation/components/molecules/CodeBlock";
import { RichHeadline } from "@/presentation/components/molecules/RichHeadline";
import styles from "./ProjectArchitecture.module.css";

/** Layers, rules, a real code sample and the stack. */
export function ProjectArchitecture({ architecture }: { readonly architecture: Architecture }) {
  const t = useTranslations("Project");
  const { headline, intro, layers, principles, sample, stack } = architecture;

  return (
    <section className={styles.architecture} id="code" aria-labelledby="code-title">
      <Chip tone="dark">{t("architectureEyebrow")}</Chip>
      <RichHeadline id="code-title" text={headline} onDark className={styles.headline} />
      <p className={styles.intro}>{intro}</p>

      <div className={styles.split}>
        <div>
          <h3 className={styles.subhead}>{t("layersTitle")}</h3>
          <ol className={styles.layers}>
            {layers.map((layer) => (
              <li key={layer.name} className={styles.layer}>
                <code className={styles.layerName}>{layer.name}</code>
                <p className={styles.role}>{layer.role}</p>
                <p className={styles.deps}>
                  {layer.dependsOn.length === 0 ? (
                    <span className={styles.none}>{t("noDependencies")}</span>
                  ) : (
                    <>
                      <span className={styles.visuallyLabel}>{t("dependsOn")}</span>
                      {layer.dependsOn.map((dep) => (
                        <span key={dep} className={styles.dep}>
                          → {dep}
                        </span>
                      ))}
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.sample}>
          <CodeBlock filename={sample.filename} code={sample.code} caption={sample.caption} />
        </div>
      </div>

      <h3 className={styles.subhead}>{t("principlesTitle")}</h3>
      <ul className={styles.principles}>
        {principles.map((p, i) => (
          <li key={p.title} className={`${styles.principle} reveal`}>
            <span className={styles.pIndex}>{String(i + 1).padStart(2, "0")}</span>
            <h4 className={styles.pTitle}>{p.title}</h4>
            <p className={styles.pText}>{p.text}</p>
          </li>
        ))}
      </ul>

      <h3 className={styles.subhead}>{t("stackTitle")}</h3>
      <ul className={styles.stack}>
        {stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
