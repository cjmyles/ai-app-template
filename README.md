# ai-app-template

A pnpm monorepo template for shipping a Next.js web app and an Expo mobile app from a single codebase, with shared types and UI primitives.

## What this is

A hardened v1 starting point — not a demo. It establishes the workspace structure, tooling constraints, auth scaffold, and cross-platform UI foundation. Clone it, rename things, and build on top of it.

## Architecture

```
apps/
  web/       Next.js 15 (App Router), Auth.js 5, Prisma 6, Tailwind 4
  native/    Expo 52, expo-router, NativeWind 4

packages/
  types/     Shared Zod schemas and TypeScript types
  ui/        Shared UI primitives (.web.tsx + .native.tsx per component)
```

Each app is independently runnable. Shared packages contain no app logic and no environment variable reads.

## Setup

```sh
pnpm install
docker compose up -d
cp .env.example .env
pnpm --filter web prisma migrate dev
pnpm --filter web db:seed        # creates dev@example.com
pnpm dev:web
pnpm dev:native
```

### Native API URL

The native app reads `EXPO_PUBLIC_API_URL` from `apps/native/.env`.

| Target | URL |
|---|---|
| iOS Simulator | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` |
| Physical device | `http://<your-machine-lan-ip>:3000` |

Copy `apps/native/.env.example` to `apps/native/.env` and set the correct URL.

## Checks

```sh
pnpm typecheck   # tsc across all packages
pnpm lint        # Biome across the whole repo
```

CI runs both on every push to `main` and on all pull requests.
