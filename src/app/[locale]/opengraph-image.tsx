import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { loadHomePage } from "@/core/di/container";
import { isLocale, DEFAULT_LOCALE, LOCALES } from "@/core/domain/locale";

export const alt = "Emrah Atalay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/** Social share card, rendered once per locale at build time. */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const [{ content, profile, services }, font] = await Promise.all([
    loadHomePage(locale),
    readFile(join(process.cwd(), "src/assets/fonts/ArchivoBlack-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: "#fff",
          fontFamily: "Archivo",
          backgroundColor: "#161514",
          backgroundImage:
            "radial-gradient(700px 500px at 82% 20%, rgba(240,90,26,.35), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              padding: "6px 22px",
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,.25)",
            }}
          >
            {profile.brand}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,.7)" }}>eatalay.dev</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,.75)" }}>
            {`${profile.name} · ${content.hero.eyebrow}`}
          </div>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, marginTop: 18 }}>{content.hero.titleLead}</div>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, color: "#f05a1a" }}>
            {content.hero.titleAccent}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
            {services.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  fontSize: 20,
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,.12)",
                }}
              >
                {s.shortTitle}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: font, style: "normal", weight: 900 }] },
  );
}
