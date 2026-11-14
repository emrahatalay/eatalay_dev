import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadProjectPage, loadProjectSlugs } from "@/core/di/container";
import { isLocale, LOCALES } from "@/core/domain/locale";
import { ProjectTemplate } from "@/presentation/components/templates/ProjectTemplate";
import { buildProjectMetadata } from "@/presentation/seo/metadata";
import { buildProjectStructuredData, serializeJsonLd } from "@/presentation/seo/structured-data";

interface PageProps {
  readonly params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const perLocale = await Promise.all(
    LOCALES.map(async (locale) => (await loadProjectSlugs(locale)).map((slug) => ({ locale, slug }))),
  );
  return perLocale.flat();
}

async function resolvePage(params: PageProps["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return null;
  return loadProjectPage(locale, slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await resolvePage(params);
  if (!page) return {};
  return buildProjectMetadata(page);
}

export default async function ProjectRoute({ params }: PageProps) {
  const page = await resolvePage(params);
  if (!page) notFound();
  setRequestLocale(page.locale);

  const t = await getTranslations({ locale: page.locale, namespace: "Nav" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildProjectStructuredData(page, t("work"))) }}
      />
      <ProjectTemplate page={page} />
    </>
  );
}
