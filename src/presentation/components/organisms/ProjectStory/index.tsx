import { useTranslations } from "next-intl";
import type { ProjectStory as Story } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import { PhoneFrame } from "@/presentation/components/molecules/PhoneFrame";
import { RichHeadline } from "@/presentation/components/molecules/RichHeadline";
import styles from "./ProjectStory.module.css";

export function ProjectStory({ story }: { readonly story: Story }) {
  const t = useTranslations("Project");

  return (
    <section className={styles.story} id="story" aria-labelledby="story-title">
      <div className={styles.text}>
        <Chip>{t("storyEyebrow")}</Chip>
        <RichHeadline id="story-title" text={story.headline} className={styles.headline} />
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className={`${styles.paragraph} reveal`}>
            {paragraph}
          </p>
        ))}
        <figure className={`${styles.punchline} reveal`}>
          <blockquote className={styles.quote}>{story.punchline.text}</blockquote>
          <figcaption className={styles.caption}>{story.punchline.caption}</figcaption>
        </figure>
      </div>

      <div className={styles.visual}>
        <div className={styles.glow} aria-hidden="true" />
        <PhoneFrame
          image={story.screenshot.image}
          sizes="(max-width: 640px) 62vw, 300px"
          className={styles.phone}
        />
      </div>
    </section>
  );
}
