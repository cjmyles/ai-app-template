# Shared AI Instructions

These instructions apply to all AI coding assistants used in this repository.

## Core Principles

- Keep the template small, reusable, and easy to understand.
- Prefer simple modules with clear contracts over broad abstractions.
- Put shared behavior in the smallest durable home that matches its real reuse.
- Do not add product-specific workflows, vendor-specific integrations, or fake
  production data to the starter.
- Fix forward by default. Do not revert user changes unless explicitly asked.

## Code Organisation

- Use TypeScript and ES module syntax.
- Keep `apps/web/src/lib` for generic app infrastructure only: environment
  access, auth/session helpers, SDK adapters, HTTP helpers, and other app-wide
  utilities.
- Do not put feature logic, React hooks, DTO construction, or business rules in
  `apps/web/src/lib`.
- Prefer feature-owned code under `apps/web/src/features/<feature>` when code is
  tied to one capability.
- Keep `packages/types` as the canonical home for cross-app TypeScript types and
  Zod schemas.
- Keep `packages/validation` for reusable validation helpers and pure decision
  logic that is shared across apps.
- Keep `packages/ui` for neutral cross-platform primitives, tokens, and visual
  helpers. Domain or workflow components stay in app features.
- Preserve the no-default-export rule unless a framework requires a default
  export.

## Web Feature Shape

Feature folders with more than one file use this shape:

```text
apps/web/src/features/<feature>/
  components/
  hooks/
  server/
  client/
  shared/
  types.ts
  schemas.ts
```

- `components/` contains React UI scoped to the feature.
- `hooks/` contains feature-scoped React hooks.
- `server/` contains server-only code, database access, route-handler logic,
  secret reads, and modules that import server-only dependencies.
- `client/` contains browser-only helpers and code that touches the DOM.
- `shared/` contains pure isomorphic helpers with no environment access or side
  effects.
- `types.ts` and `schemas.ts` are feature-local. Promote contracts to
  `packages/types` when they cross app or API boundaries.
- Avoid feature-root barrels. A root `index.ts` can accidentally mix server,
  client, and component modules into the wrong bundle.
- Layer-level barrels are acceptable when they stay within one layer, such as
  `components/index.ts` or `shared/index.ts`.

## Dependency Discipline

- Use pnpm workspaces consistently.
- Add dependencies to the package that imports them.
- Prefer existing workspace packages before adding a new dependency.
- Do not add large UI, validation, state, or utility dependencies for small
  starter examples.
- Keep generated database/client artifacts out of client and shared packages.
- Keep one root `.env` convention for local development. Do not introduce
  per-app `.env.local` assumptions.

## UI Rules

- Use `@repo/ui` primitives for neutral repeated states such as buttons, cards,
  inputs, badges, empty states, notices, status pills, and segmented controls.
- Add tokens in `packages/ui/src/tokens` before adding new shared colors,
  spacing, or typography values.
- Do not introduce raw hex/rgb/hsl color values in app UI source. Use tokens or
  shared token-backed helpers.
- Keep app-specific workflow components in the app until they are clearly
  domain-neutral and useful across app boundaries.
- Do not render fabricated production data in real routes or screens. Render
  explicit empty, loading, or error states.
- Keep one static styling approach inside a component. Inline styles should be
  limited to dynamic runtime values.

## Testing And Validation

- Put tests in `__tests__/` folders near the source they cover.
- Do not add top-level `tests/` folders or sibling `*.test.ts` files for new
  code.
- Run focused tests for the behavior changed.
- Run `pnpm typecheck` and `pnpm lint` after meaningful code changes.
- Run `pnpm validate:final` immediately before a commit, push, or PR.
- If files are added, renamed, deleted, or validation scripts change after a
  passing validation run, rerun `pnpm validate:final`.

## PR Hygiene

- Keep PRs focused on one coherent change.
- Stage only files related to the requested work.
- Summarize validation commands and results in the PR body.
- Call out intentionally skipped validation and the reason.
- Update docs in the same PR when setup, architecture, testing, environment, or
  shared package behavior changes.

## Safety

- Do not commit secrets or `.env` files.
- Use environment variables for sensitive values.
- Do not weaken authentication, authorization, validation, or data integrity to
  make local workflows pass.
- Ask before destructive actions or behavior changes that alter platform
  guarantees.
