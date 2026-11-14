import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { basename, join } from "node:path";
import { ImageResponse } from "next/og";
import { loadProjectPage, loadProjectSlugs } from "@/core/di/container";
import { isLocale, DEFAULT_LOCALE, LOCALES } from "@/core/domain/locale";

export const alt = "eatalay.dev project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const perLocale = await Promise.all(
    LOCALES.map(async (locale) => (await loadProjectSlugs(locale)).map((slug) => ({ locale, slug }))),
  );
  return perLocale.flat();
}

/** Reads a bundled screenshot back from src/assets by its original file name (the bundler adds a hash). */
async function screenshotDataUri(slug: string, src: string): Promise<string | null> {
  const name = basename(src).split(".")[0];
  try {
    // Screenshots ship as WebP; the OG renderer only reads PNG/JPEG, so convert at build time.
    const webp = await readFile(join(process.cwd(), "src/assets/images", slug, `${name}.webp`));
    const jpeg = await sharp(webp).resize({ width: 428 }).jpeg({ quality: 82 }).toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  } catch {
    return null;
  }
}

/** "#rrggbb" + alpha → rgba(); Satori does not support color-mix. */
function glow(hex: string, alpha: number): string {
  const n = Number.parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

/** Share card for a project: name, slogan and the two hero screenshots in phone frames. */
export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const page = await loadProjectPage(locale, slug);
  const font = await readFile(join(process.cwd(), "src/assets/fonts/ArchivoBlack-Regular.ttf"));
  const project = page?.project;
  const shots = project
    ? await Promise.all(project.hero.phones.map((p) => screenshotDataUri(slug, p.image.src)))
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          color: "#fff",
          fontFamily: "Archivo",
          backgroundColor: project?.palette.night ?? "#161514",
          backgroundImage:
            `radial-gradient(700px 500px at 85% 40%, ${glow(project?.palette.hot ?? "#f05a1a", 0.4)}, transparent 70%)`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: 700 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 24,
              padding: "6px 20px",
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,.25)",
              color: "rgba(255,255,255,.85)",
            }}
          >
            {project?.hero.eyebrow ?? "eatalay.dev"}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 104, lineHeight: 0.95 }}>
              {(project?.hero.title ?? "").toLocaleUpperCase(locale)}
            </div>
            <div style={{ display: "flex", fontSize: 40, color: project?.palette.soft ?? "#f05a1a", marginTop: 12 }}>
              {project?.hero.accent ?? ""}
            </div>
            <div style={{ display: "flex", fontSize: 34, marginTop: 36, color: project?.palette.gold ?? "#ffb08a" }}>
              {project?.hero.slogan ?? ""}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,.7)" }}>
            {footerLine(project?.badges ?? [])}
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", flex: 1 }}>
          {shots.map((uri, i) =>
            uri ? (
              <div
                key={uri.slice(-24)}
                style={{
                  display: "flex",
                  position: "absolute",
                  top: i === 0 ? 70 : 40,
                  left: i === 0 ? 40 : 230,
                  width: 230,
                  height: 511,
                  padding: 8,
                  borderRadius: 36,
                  background: "#16141f",
                  border: "2px solid rgba(255,255,255,.18)",
                  transform: i === 0 ? "rotate(-6deg)" : "rotate(5deg)",
                }}
              >
                <img src={uri} width={214} height={495} style={{ borderRadius: 28, objectFit: "cover" }} alt="" />
              </div>
            ) : null,
          ).reverse()}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: font, style: "normal", weight: 900 }] },
  );
}

/** "eatalay.dev · badge · badge", keeping only as many badges as fit on one line. */
function footerLine(badges: readonly string[], maxLength = 44): string {
  let line = "eatalay.dev";
  for (const badge of badges) {
    const next = `${line} · ${badge}`;
    if (next.length > maxLength) break;
    line = next;
  }
  return line;
}
