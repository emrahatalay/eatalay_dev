import { useTranslations } from "next-intl";
import type { HomePage } from "@/core/application/use-cases/get-home-page";
import type { ProjectKind, ProjectStatus } from "@/core/domain/entities";
import type { NavItem } from "@/presentation/components/molecules/NavLinks";
import { About } from "@/presentation/components/organisms/About";
import { Faq } from "@/presentation/components/organisms/Faq";
import { Hero } from "@/presentation/components/organisms/Hero";
import { PortfolioPreview } from "@/presentation/components/organisms/PortfolioPreview";
import { Services } from "@/presentation/components/organisms/Services";
import { SiteFooter } from "@/presentation/components/organisms/SiteFooter";
import { SiteHeader } from "@/presentation/components/organisms/SiteHeader";
import { Testimonials } from "@/presentation/components/organisms/Testimonials";
import { toProjectCard } from "@/presentation/view-models/project-card";
import { portfolioPath } from "@/shared/config/site";
import { PageShell } from "../PageShell";

/** How many of the newest projects the home page previews; the rest are on the portfolio page. */
const PREVIEW_COUNT = 3;

/** Lays out the home page from the read model. No data fetching here. */
export function HomeTemplate({ page }: { readonly page: HomePage }) {
  const t = useTranslations("Nav");
  const tp = useTranslations("Portfolio");
  const { profile, content, services, technologies, faqs, testimonials, projects, locale } = page;

  const navItems: NavItem[] = [
    { href: "#top", label: t("home") },
    { href: "#about", label: t("about") },
    { href: "#services", label: t("services") },
    ...(projects.length > 0 ? [{ href: "#portfolio", label: t("portfolio") }] : []),
    ...(testimonials.length > 0 ? [{ href: "#testimonials", label: t("testimonials") }] : []),
    { href: "#faq", label: t("faq") },
  ];
  const cta: NavItem = { href: "#contact", label: t("cta") };
  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  const cardLabels = {
    kind: (kind: ProjectKind) => tp(`kind.${kind}`),
    status: (status: ProjectStatus) => tp(`status.${status}`),
  };
  const previewCards = projects.slice(0, PREVIEW_COUNT).map((p) => toProjectCard(p, locale, cardLabels));

  return (
    <PageShell skipLabel={t("skip")}>
      <Hero
        content={content.hero}
        technologies={technologies}
        header={<SiteHeader brand={profile.brand} locale={locale} items={navItems} cta={cta} />}
      />
      <main id="main" tabIndex={-1}>
        <About content={content.about} />
        <Services services={services} />
        {projects.length > 0 && (
          <PortfolioPreview cards={previewCards} total={projects.length} href={portfolioPath(locale)} />
        )}
        <Testimonials intro={content.testimonials} testimonials={testimonials} />
        <Faq
          intro={content.faq}
          items={faqs}
          contact={content.contact}
          email={profile.email}
          initials={initials}
        />
      </main>
      <SiteFooter profile={profile} blurb={content.footerBlurb} links={navItems} services={services} />
    </PageShell>
  );
}
