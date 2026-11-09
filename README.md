# eatalay.dev

Source code of [eatalay.dev](https://eatalay.dev), the personal site of **Emrah Atalay**, a developer who builds mobile apps, mobile games, software and automations with AI.

The site is a single landing page:

- available in Turkish and English;
- with light and dark themes;
- statically generated with Next.js;
- styled with plain CSS, with no UI framework.

## Features

- **Two languages:** Turkish at `/` and English at `/en`. Each URL always serves the same language; there are no Accept-Language redirects.
- **Light and dark themes:** follows the OS setting until the visitor picks one with the toggle. The choice is saved and applied before first paint, so there is no flash.
- **Fast by default:**
  - every page is prerendered at build time;
  - Server Components everywhere, with only two small client components (theme toggle, mobile menu);
  - all animation is CSS, including scroll-driven effects as a progressive enhancement;
  - responsive AVIF/WebP images via `next/image`;
  - self-hosted fonts via `next/font`.
- **SEO ready:**
  - per-locale metadata, canonical and `hreflang` links (with `x-default`);
  - a generated Open Graph image per locale;
  - JSON-LD (Person, WebSite, ProfilePage, FAQPage);
  - `sitemap.xml`, `robots.txt` and a web manifest.
- **Accessible:** semantic landmarks, a skip link, a native `<details>` FAQ, a Popover API mobile menu, visible focus styles, and `prefers-reduced-motion` support.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) and React 19
- TypeScript (strict)
- [next-intl](https://next-intl.dev) for routing and UI strings
- CSS Modules with design tokens in CSS custom properties
- [Bun](https://bun.sh) as the package manager and script runner

## Getting started

Requirements: [Bun](https://bun.sh) 1.2+ (Next.js runs on Node.js 20+).

```bash
bun install
bun dev           # http://localhost:3000
```

| Script           | What it does                     |
| ---------------- | -------------------------------- |
| `bun dev`        | Development server               |
| `bun run build`  | Production build (static output) |
| `bun start`      | Serve the production build       |
| `bun lint`       | ESLint                           |
| `bun typecheck`  | TypeScript, no emit              |

### Environment

| Variable               | Required | Default               | Used for                                   |
| ---------------------- | -------- | --------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | No       | `https://eatalay.dev` | Canonical URLs, hreflang, sitemap, OG tags |

## Architecture

The code follows Clean Architecture, and dependencies only point inward. The UI is organised with atomic design.

```
src/
├── core/                     # framework-free logic
│   ├── domain/               # entities, locales, repository ports (interfaces)
│   ├── application/          # use cases: GetHomePage, GetSiteMetadata
│   ├── infrastructure/       # StaticContentRepository + typed content per locale
│   └── di/container.ts       # composition root, the only place adapters are wired
├── presentation/             # UI
│   ├── components/
│   │   ├── atoms/            # ButtonLink, Chip, Logo, Icon, Tag, Monogram…
│   │   ├── molecules/        # RichHeadline, NavLinks, ThemeToggle, FaqItem, ServiceVisual…
│   │   ├── organisms/        # Hero, About, Work, ServiceCard, Faq, SiteFooter…
│   │   └── templates/        # PageShell, HomeTemplate, StatusScreen
│   ├── seo/                  # metadata and JSON-LD builders (pure functions)
│   ├── styles/               # global tokens (light and dark) and base styles
│   └── fonts/, theme/
├── app/                      # Next.js routes, OG image, sitemap, robots, manifest
├── i18n/                     # next-intl routing and request config
└── shared/                   # site config, small utilities
content/messages/             # UI strings: tr.json, en.json
```

Conventions:

- `core/domain` imports nothing from React or Next.js.
- Use cases depend on ports, not on data sources. To use a CMS, write a new adapter that implements the ports and register it in `core/di/container.ts`; nothing else changes.
- Atoms and molecules are props-only. Organisms read UI strings with `useTranslations`.
- Service card visuals come from a typed registry. Adding a new visual type does not touch existing ones, and the build fails if a type has no renderer.

## Editing content

| What                                     | Where                                        |
| ---------------------------------------- | -------------------------------------------- |
| Page copy, services, FAQ, profile, SEO   | `src/core/infrastructure/content/{tr,en}.ts` |
| Shared facts (email, social links, tech) | `src/core/infrastructure/content/shared.ts`  |
| UI labels (menu, buttons, aria labels)   | `content/messages/{tr,en}.json`              |
| Images                                   | `src/assets/images/`                         |

The testimonials section and its menu link stay hidden while the `testimonials` array is empty. Only add real, approved quotes.

## Deployment

Every push to `main` deploys the site to a self-hosted server via GitHub Actions (`.github/workflows/deploy.yml`): lint and typecheck, a `standalone` build that is smoke-tested with bun, an rsync upload into a new release folder, a pm2 reload behind nginx, and a health check that rolls back on failure. One-time server setup and troubleshooting (in Turkish): [deploy/KURULUM.md](deploy/KURULUM.md).

The build also runs on any other Next.js host. Set `NEXT_PUBLIC_SITE_URL` to the production origin.

## Credits

- Photos from [Unsplash](https://unsplash.com), used under the [Unsplash License](https://unsplash.com/license).
- Fonts: [Archivo](https://fonts.google.com/specimen/Archivo), [Archivo Black](https://fonts.google.com/specimen/Archivo+Black) and [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif), all under the SIL Open Font License.

## License

No license has been chosen yet, so all rights are reserved. The code is public to read and learn from. Please ask before reusing the content, name or branding.
