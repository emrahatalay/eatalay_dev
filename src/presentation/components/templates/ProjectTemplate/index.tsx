import { useTranslations } from "next-intl";
import type { ProjectPage } from "@/core/application/use-cases/get-project-page";
import type { NavItem } from "@/presentation/components/molecules/NavLinks";
import { ProjectArchitecture } from "@/presentation/components/organisms/ProjectArchitecture";
import { ProjectCta } from "@/presentation/components/organisms/ProjectCta";
import { ProjectFacts } from "@/presentation/components/organisms/ProjectFacts";
import { ProjectGallery } from "@/presentation/components/organisms/ProjectGallery";
import { ProjectHero } from "@/presentation/components/organisms/ProjectHero";
import { ProjectMechanics } from "@/presentation/components/organisms/ProjectMechanics";
import { ProjectRoadmap } from "@/presentation/components/organisms/ProjectRoadmap";
import { ProjectRoster } from "@/presentation/components/organisms/ProjectRoster";
import { ProjectStory } from "@/presentation/components/organisms/ProjectStory";
import { ProjectWorkflow } from "@/presentation/components/organisms/ProjectWorkflow";
import { SiteFooter } from "@/presentation/components/organisms/SiteFooter";
import { SiteHeader } from "@/presentation/components/organisms/SiteHeader";
import { homeSection, localePath, portfolioPath, projectPath } from "@/shared/config/site";
import { paletteStyle } from "@/presentation/theme/project-palette";
import { PageShell } from "../PageShell";

/** Lays out a project case study from the read model. No data fetching here. */
export function ProjectTemplate({ page }: { readonly page: ProjectPage }) {
  const t = useTranslations();
  const { profile, content, services, project, locale } = page;
  const home = localePath(locale);

  const navItems: NavItem[] = [
    { href: "#top", label: project.labels.nav },
    { href: "#story", label: t("Project.navStory") },
    { href: "#screens", label: t("Project.navScreens") },
    { href: "#code", label: t("Project.navCode") },
    { href: "#roadmap", label: t("Project.navRoadmap") },
  ];
  const contactHref = homeSection(locale, "contact");
  const cta: NavItem = { href: contactHref, label: t("Nav.cta") };
  const footerLinks: NavItem[] = [
    { href: home, label: t("Nav.home") },
    { href: homeSection(locale, "about"), label: t("Nav.about") },
    { href: homeSection(locale, "services"), label: t("Nav.services") },
    { href: portfolioPath(locale), label: t("Nav.portfolio") },
    { href: homeSection(locale, "faq"), label: t("Nav.faq") },
  ];

  return (
    <PageShell skipLabel={t("Nav.skip")} style={paletteStyle(project.palette)}>
      <ProjectHero
        project={project}
        header={
          <SiteHeader
            brand={profile.brand}
            locale={locale}
            items={navItems}
            cta={cta}
            logoHref={home}
            localeHref={(l) => projectPath(l, project.slug)}
          />
        }
      />
      <main id="main" tabIndex={-1}>
        <ProjectFacts facts={project.facts} />
        <ProjectStory story={project.story} />
        <ProjectGallery shots={project.gallery} title={project.labels.galleryTitle} hint={project.labels.galleryHint} />
        <ProjectMechanics mechanics={project.mechanics} eyebrow={project.labels.mechanicsEyebrow} />
        <ProjectRoster groups={project.roster} title={project.labels.rosterTitle} />
        <ProjectArchitecture architecture={project.architecture} />
        <ProjectWorkflow workflow={project.workflow} />
        <ProjectRoadmap roadmap={project.roadmap} />
        <ProjectCta cta={project.cta} contactHref={contactHref} link={project.link} />
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
