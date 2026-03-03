# Agent Rules (ai-app-template)

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

Verify with: `pnpm typecheck && pnpm lint`

## Non-negotiables

- **pnpm workspaces only.** Do not use npm or yarn.
- **TypeScript strict mode everywhere.** Do not relax any compiler options.
- **Biome for formatting and linting.** Do not add Prettier or ESLint.
- **No default exports** unless a framework requires it (Next.js pages, Expo screens).
- **No new dependencies without justification.** Every dep must earn its place.
- **Do not modify infra** (Docker, CI, Prisma provider, auth strategy) unless explicitly instructed.

## Where code lives

| Location | Purpose |
|---|---|
| `packages/ui` | Shared UI primitives only — Button, Text, Input, Badge, Avatar. No feature components, no business logic, no screen layouts. |
| `packages/types` | Cross-app TypeScript types and Zod schemas. No Prisma types, no DB models. |
| `apps/web` | Next.js app: App Router, Auth.js, Prisma, API routes. Web-only UI and features. |
| `apps/native` | Expo app: navigation, device APIs. Native-only UI and features. |

## Boundaries

- Shared packages (`packages/*`) must not read environment variables.
- Shared packages must not contain app-specific business logic.
- `packages/ui` ships `.web.tsx` and `.native.tsx` variants for every component; never a single file that branches on platform.
- API contracts are defined in `packages/types` as Zod schemas. Consumers use `.safeParse()` — never cast unknown JSON.

## PR discipline

- Keep PRs small and focused.
- PR description must include: summary of change, test notes, and any follow-ups.
- Run `pnpm typecheck && pnpm lint` locally before opening a PR.
