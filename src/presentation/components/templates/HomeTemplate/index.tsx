import { useTranslations } from "next-intl";
import type { HomePage } from "@/core/application/use-cases/get-home-page";
import type { NavItem } from "@/presentation/components/molecules/NavLinks";
import { About } from "@/presentation/components/organisms/About";
import { Faq } from "@/presentation/components/organisms/Faq";
import { Hero } from "@/presentation/components/organisms/Hero";
import { SiteFooter } from "@/presentation/components/organisms/SiteFooter";
import { SiteHeader } from "@/presentation/components/organisms/SiteHeader";
import { Testimonials } from "@/presentation/components/organisms/Testimonials";
import { Work } from "@/presentation/components/organisms/Work";
import { PageShell } from "../PageShell";

/** Lays out the home page from the read model. No data fetching here. */
export function HomeTemplate({ page }: { readonly page: HomePage }) {
  const t = useTranslations("Nav");
  const { profile, content, services, technologies, faqs, testimonials, locale } = page;

  const navItems: NavItem[] = [
    { href: "#top", label: t("home") },
    { href: "#about", label: t("about") },
    { href: "#work", label: t("work") },
    ...(testimonials.length > 0 ? [{ href: "#testimonials", label: t("testimonials") }] : []),
    { href: "#faq", label: t("faq") },
  ];
  const cta: NavItem = { href: "#contact", label: t("cta") };
  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <PageShell skipLabel={t("skip")}>
      <Hero
        content={content.hero}
        technologies={technologies}
        header={<SiteHeader brand={profile.brand} locale={locale} items={navItems} cta={cta} />}
      />
      <main id="main" tabIndex={-1}>
        <About content={content.about} />
        <Work services={services} />
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
