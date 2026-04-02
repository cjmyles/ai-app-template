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
pnpm typecheck   # tsc across all packages
pnpm lint        # Biome plus guard scripts
pnpm test:native # Jest + React Native Testing Library smoke coverage
```

CI runs both on every push to `main` and on all pull requests.

## Additional Docs

- `docs/ai-shared-instructions.md` — canonical cross-assistant implementation rules
- `docs/environment-model-runbook.md` — environment, delivery, and seeding model
- `CONTRIBUTING.md` — git workflow and UI component guidance
