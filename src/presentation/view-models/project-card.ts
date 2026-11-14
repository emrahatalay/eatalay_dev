import type { Project, ProjectKind, ProjectStatus } from "@/core/domain/entities";
import type { Locale } from "@/core/domain/locale";
import type { ProjectCardData } from "@/presentation/components/molecules/ProjectCard";
import { projectPath } from "@/shared/config/site";

export interface ProjectCardLabels {
  readonly kind: (kind: ProjectKind) => string;
  readonly status: (status: ProjectStatus) => string;
}

/** "2026-11" → "Kas 2026" / "Nov 2026". Formatted on the server so client markup matches. */
export function formatMonth(yearMonth: string, locale: Locale): string {
  const [year, month] = yearMonth.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, (month || 1) - 1, 1)),
  );
}

/** Maps a project to the translated, serialisable data a portfolio card shows. */
export function toProjectCard(project: Project, locale: Locale, labels: ProjectCardLabels): ProjectCardData {
  const [first, second] = project.teaser.phones;

  return {
    slug: project.slug,
    href: projectPath(locale, project.slug),
    name: project.hero.title,
    accent: project.hero.accent,
    text: project.teaser.text,
    ctaLabel: project.teaser.ctaLabel,
    badges: project.badges,
    kindLabel: labels.kind(project.kind),
    status: project.status,
    statusLabel: labels.status(project.status),
    dateLabel: formatMonth(project.publishedAt, locale),
    palette: project.palette,
    phones: [second.image, first.image],
  };
}
