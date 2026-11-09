import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { loadHomePage, loadSiteMetadata } from "@/core/di/container";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/core/domain/locale";
import { HomeTemplate } from "@/presentation/components/templates/HomeTemplate";
import { buildMetadata } from "@/presentation/seo/metadata";
import { buildStructuredData, serializeJsonLd } from "@/presentation/seo/structured-data";

interface PageProps {
  readonly params: Promise<{ locale: string }>;
}

async function resolveLocale(params: PageProps["params"]): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return buildMetadata(await loadSiteMetadata(await resolveLocale(params)));
}

export default async function HomePage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const [page, meta] = await Promise.all([loadHomePage(locale), loadSiteMetadata(locale)]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildStructuredData(meta)) }}
      />
      <HomeTemplate page={page} />
    </>
  );
}
