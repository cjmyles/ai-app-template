# ai-app-template

A pnpm monorepo template for shipping a Next.js web app and an Expo mobile app from a single codebase, with shared types and UI primitives.

## What this is

A hardened v1 starting point — not a demo. It establishes the workspace structure, tooling constraints, auth scaffold, and cross-platform UI foundation. Clone it, rename things, and build on top of it.

## Architecture

```
apps/
  web/       Next.js 15 (App Router), Auth.js 5, Prisma 6, Tailwind 4
  native/    Expo 54, expo-router, NativeWind 4

packages/
  types/     Shared Zod schemas and TypeScript types
  validation Shared business validation / decision helpers
  ui/        Shared UI primitives and common visual patterns
```

Each app is independently runnable. Shared packages contain no app logic and no environment variable reads.

## Setup

```sh
pnpm install
docker compose up -d
cp .env.example .env
pnpm db:push
pnpm db:seed:demo
pnpm dev:web
pnpm dev:native
```

Set `NEXT_PUBLIC_SITE_URL` in the root `.env` to your production origin before launch. The web app uses it for canonical URLs, `robots.txt`, `sitemap.xml`, and structured data. Leave it unset or empty in local development if you do not want those URLs emitted from localhost.

`pnpm dev:web` pins Next.js to port `3000` so `AUTH_URL` stays stable. If you run
the web app on a different port, update `AUTH_URL` in the root `.env` to the
same origin.

The Docker Compose file avoids fixed container names so multiple clones can run
without container-name collisions. If two local projects need Postgres at the
same time, change `POSTGRES_PORT`, `POSTGRES_DB`, and `DATABASE_URL` in that
project's root `.env`. If multiple clones use the same checkout directory name,
also set a unique `COMPOSE_PROJECT_NAME`.

### Prerequisites

- Node.js 20.19.4+ and `<21`
- pnpm
- Docker

### Local Environment

All local app commands read from the repo root `.env`.

| Target | URL |
|---|---|
| iOS Simulator | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` |
| Physical device | `http://<your-machine-lan-ip>:3000` |

Set `EXPO_PUBLIC_API_URL` in the root `.env` to match the right target for your
native runtime.

Native development commands:

- `pnpm dev:native` for Expo Go on localhost
- `pnpm dev:native:lan` for Expo Go over LAN
- `pnpm dev:native:tunnel` for Expo Go over tunnel
- `pnpm dev:native:dev-client` for a custom dev client on localhost
- `pnpm dev:native:dev-client:lan` for a custom dev client over LAN
- `pnpm dev:native:dev-client:tunnel` for a custom dev client over tunnel
- `pnpm native:doctor` for a native toolchain/config sanity check

The template defaults to a greenfields Prisma workflow:

- `pnpm db:push` applies schema changes
- `pnpm db:seed:baseline` seeds the smallest useful dataset
- `pnpm db:seed:demo` seeds the baseline plus a demo account set

Committed Prisma migrations are intentionally blocked while the template is in
this mode.

## Checks

```sh
pnpm validate:fast # lightweight web-focused validation for fast iteration
pnpm validate:pr   # final pre-commit/pre-push/pre-PR gate
pnpm typecheck     # tsc across all packages
pnpm lint          # Biome plus guard scripts
pnpm test:native   # Jest + React Native Testing Library smoke coverage
```

Use fast validation during normal implementation. Use `pnpm validate:pr` only
when preparing to commit, push, or open/update a PR. `pnpm validate:final` is
kept as a compatibility alias for `pnpm validate:pr`.

CI runs both on every push to `main` and on all pull requests.

## SEO Defaults

The web scaffold includes reusable App Router SEO primitives:

- `apps/web/lib/seo/config.ts` centralizes the site name, default description, production domain, and social preview defaults.
- `apps/web/lib/seo/metadata.ts` provides canonical URL, metadata, and public/private indexing helpers.
- `apps/web/app/robots.ts`, `apps/web/app/sitemap.ts`, and `apps/web/app/manifest.ts` provide the standard crawl surfaces.
- `apps/web/app/opengraph-image.tsx`, `apps/web/app/icon.tsx`, and `apps/web/app/apple-icon.tsx` generate default share and icon assets without extra files.

Customize these values after scaffolding a new project:

- `NEXT_PUBLIC_SITE_URL` in the root `.env`
- `apps/web/lib/seo/config.ts` for the site name, default title/description, keywords, and OG image copy
- The default landing page copy in `apps/web/app/page.tsx`

Private or authenticated routes should use the SEO helpers with `indexing: "private"` so they ship with `noindex` by default.

## Authentication Notes

The credentials scaffold catches ordinary failed credentials and displays an
inline error instead of surfacing a framework error overlay.

For protected routes, do not blindly redirect every signed-in user from the login
page to a protected destination. Signed-in users may still lack authorization for
that route. See `docs/architecture/authentication.md` for the safe redirect
pattern.

## Additional Docs

- `docs/engineering/ai-shared-instructions.md` — canonical cross-assistant implementation rules
- `docs/architecture/authentication.md` — Auth.js login and protected-route guidance
- `docs/environment-model-runbook.md` — environment, delivery, and seeding model
- `CONTRIBUTING.md` — git workflow and UI component guidance
