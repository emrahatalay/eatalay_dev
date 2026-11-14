import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { ImageResponse } from "next/og";
import { loadProjectPage, loadProjectSlugs } from "@/core/di/container";
import { isLocale, DEFAULT_LOCALE, LOCALES } from "@/core/domain/locale";

export const alt = "Out of Office";
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
    const data = await readFile(join(process.cwd(), "src/assets/images", slug, `${name}.jpg`));
    return `data:image/jpeg;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
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
          backgroundColor: "#07060d",
          backgroundImage:
            "radial-gradient(700px 500px at 85% 40%, rgba(123,92,255,.55), transparent 70%), radial-gradient(500px 400px at 5% 110%, rgba(255,106,43,.45), transparent 70%)",
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
            <div style={{ display: "flex", fontSize: 40, color: "#b9a6ff", marginTop: 12 }}>
              {project?.hero.accent ?? ""}
            </div>
            <div style={{ display: "flex", fontSize: 34, marginTop: 36, color: "#ffb08a" }}>
              {project?.hero.slogan ?? ""}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,.7)" }}>
            eatalay.dev · Unity 6 · Android · iOS
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
