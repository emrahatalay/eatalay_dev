import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadPortfolioPage } from "@/core/di/container";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/core/domain/locale";
import { PortfolioTemplate } from "@/presentation/components/templates/PortfolioTemplate";
import { buildPortfolioMetadata } from "@/presentation/seo/metadata";
import { buildPortfolioStructuredData, serializeJsonLd } from "@/presentation/seo/structured-data";

interface PageProps {
  readonly params: Promise<{ locale: string }>;
}

async function resolveLocale(params: PageProps["params"]): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

async function portfolioSeo(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "Portfolio" });
  return { title: t("seoTitle"), description: t("seoDescription") };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const page = await loadPortfolioPage(locale);
  return buildPortfolioMetadata({ locale, profile: page.profile, ...(await portfolioSeo(locale)) });
}

export default async function PortfolioRoute({ params }: PageProps) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const page = await loadPortfolioPage(locale);
  const seo = await portfolioSeo(locale);
  const t = await getTranslations({ locale, namespace: "Nav" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildPortfolioStructuredData(page, { ...seo, label: t("portfolio") })),
        }}
      />
      <PortfolioTemplate page={page} />
    </>
  );
}
