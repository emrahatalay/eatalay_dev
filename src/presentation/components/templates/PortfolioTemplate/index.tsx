import { useTranslations } from "next-intl";
import type { PortfolioPage } from "@/core/application/use-cases/get-portfolio-page";
import type { ProjectKind, ProjectStatus } from "@/core/domain/entities";
import type { NavItem } from "@/presentation/components/molecules/NavLinks";
import { PortfolioBrowser, type PortfolioEntry } from "@/presentation/components/organisms/PortfolioBrowser";
import { PortfolioHero } from "@/presentation/components/organisms/PortfolioHero";
import { SiteFooter } from "@/presentation/components/organisms/SiteFooter";
import { SiteHeader } from "@/presentation/components/organisms/SiteHeader";
import { toProjectCard } from "@/presentation/view-models/project-card";
import { homeSection, localePath, portfolioPath } from "@/shared/config/site";
import { foldForSearch } from "@/shared/lib/search";
import { PageShell } from "../PageShell";

const KINDS: readonly ProjectKind[] = ["game", "app", "web", "automation"];

/** Lays out the portfolio listing from the read model. No data fetching here. */
export function PortfolioTemplate({ page }: { readonly page: PortfolioPage }) {
  const t = useTranslations();
  const tp = useTranslations("Portfolio");
  const { profile, content, services, projects, locale } = page;
  const home = localePath(locale);

  const navItems: NavItem[] = [
    { href: "#top", label: t("Nav.portfolio") },
    { href: home, label: t("Nav.home") },
    { href: homeSection(locale, "services"), label: t("Nav.services") },
    { href: homeSection(locale, "faq"), label: t("Nav.faq") },
  ];
  const cta: NavItem = { href: homeSection(locale, "contact"), label: t("Nav.cta") };
  const footerLinks: NavItem[] = [
    { href: home, label: t("Nav.home") },
    { href: homeSection(locale, "about"), label: t("Nav.about") },
    { href: homeSection(locale, "services"), label: t("Nav.services") },
    { href: portfolioPath(locale), label: t("Nav.portfolio") },
    { href: homeSection(locale, "faq"), label: t("Nav.faq") },
  ];

  const cardLabels = {
    kind: (kind: ProjectKind) => tp(`kind.${kind}`),
    status: (status: ProjectStatus) => tp(`status.${status}`),
  };
  const entries: PortfolioEntry[] = projects.map((project) => ({
    card: toProjectCard(project, locale, cardLabels),
    kind: project.kind,
    publishedAt: project.publishedAt,
    haystack: foldForSearch(
      [
        project.name,
        project.hero.title,
        project.hero.accent,
        project.hero.slogan,
        project.teaser.text,
        tp(`kind.${project.kind}`),
        tp(`status.${project.status}`),
        ...project.badges,
        ...project.architecture.stack,
        ...project.schema.platforms,
      ].join(" "),
      locale,
    ),
  }));

  return (
    <PageShell skipLabel={t("Nav.skip")}>
      <PortfolioHero
        eyebrow={tp("eyebrow")}
        title={tp("title")}
        intro={tp("intro")}
        total={projects.length}
        countLabel={tp("count", { count: projects.length })}
        header={
          <SiteHeader
            brand={profile.brand}
            locale={locale}
            items={navItems}
            cta={cta}
            logoHref={home}
            localeHref={portfolioPath}
          />
        }
      />
      <main id="main" tabIndex={-1}>
        <PortfolioBrowser
          locale={locale}
          entries={entries}
          labels={{
            searchLabel: tp("searchLabel"),
            searchPlaceholder: tp("searchPlaceholder"),
            filterLabel: tp("filterLabel"),
            sortLabel: tp("sortLabel"),
            sort: { newest: tp("sortNewest"), oldest: tp("sortOldest"), name: tp("sortName") },
            all: tp("all"),
            kinds: KINDS.map((kind) => ({ kind, label: tp(`kind.${kind}`) })),
            results: Array.from({ length: projects.length + 1 }, (_, count) => tp("results", { count })),
            empty: tp("empty"),
            clear: tp("clear"),
          }}
        />
      </main>
      <SiteFooter
        profile={profile}
        blurb={content.footerBlurb}
        links={footerLinks}
        services={services}
        servicesHref={homeSection(locale, "services")}
        logoHref={home}
      />
    </PageShell>
  );
}
