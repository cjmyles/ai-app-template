# Shared AI Instructions

These instructions apply to all AI coding assistants used in this repository.

## Shared Types First

1. Prefer `@repo/types` for cross-app contracts.
- Before creating page-local or feature-local enums / unions, check
  `packages/types` first.
- If a type is reused or likely to be reused across `apps/web`,
  `apps/native`, and server code, define it in `packages/types`.

2. Prisma enum workflow.
- Prisma enums in `apps/web/prisma/schema.prisma` are the source of truth.
- Shared enum literals/types are generated into
  `packages/types/src/generated-enums.ts`.
- Do not hand-edit generated enum literals. Run:
  - `pnpm gen:types:enums`
- Keep `packages/types/src/enums.ts` for re-exports, labels, helpers, and small
  manual runtime constants.

3. No duplicated enum literals in features.
- UI selects/options should be driven from shared `...Values`.
- Display text for enum values should come from shared label maps/helpers in
  `@repo/types`.

4. Prisma boundaries.
- Do not import `@prisma/client` into native code, shared packages, or client
  bundles.
- Server code may use Prisma client, but shared/domain enum contracts should
  still originate in `@repo/types`.

## Validation Boundaries

1. `@repo/types` is for shared contracts.
- Keep Zod schemas, DTOs, and cross-app TypeScript types in `packages/types`.

2. `@repo/validation` is for business validation and decision logic.
- Put reusable decision helpers and operational validation there when they do
  not belong in DTO/type definitions.
- Do not put app-specific UI state or environment reads in shared packages.

## UI Rules

1. Put UI at the right layer.
- `packages/ui` is for shared primitives, tokens, and common visual patterns.
- App-local workflow/domain composites should stay in app code even if they are
  reused within that app.

2. Promotion heuristics before moving UI to `packages/ui`.
- Promote a component only when all are true:
  - It is not workflow/domain-specific.
  - It is expected to be reused across app boundaries or multiple screens.
  - It can stay API-agnostic and state-agnostic.

3. No fake production data in real screens.
- Do not render fabricated fallback data in production routes/screens.
- If required data is missing or invalid, render explicit error or empty states.

4. Tokens first.
- Do not add raw hex colors outside `packages/ui/src/tokens/*`.
- Add missing shared colors/tokens in `packages/ui` before using them in apps.

5. Prefer shared primitives for common state patterns.
- Error, empty, success, and info states should use shared UI primitives
  instead of page-local reimplementations when the pattern is reusable.

6. Do not mix static styling systems within one component.
- Use one primary static styling approach per component.
- Inline style objects are acceptable only for dynamic runtime values that
  cannot be expressed statically.

## Change Strategy

1. Fix forward by default.
- Prefer targeted forward fixes over reverting current direction/intent.

2. Preserve template constraints.
- Keep Biome as the formatter/linter.
- Keep repo-wide `typecheck` in place.
- Keep `no default exports unless framework-required`.

3. Avoid weakening platform behavior for convenience.
- Do not relax validation, authentication, or other production-like behavior
  just to make local workflows pass.
- If the right fix is configuration or environment setup, document that first.

## API And Code Conventions

1. Use standard REST conventions.
- Prefer nouns over verbs.
- Use HTTP methods to express actions.
- Keep one canonical URL per resource.

2. Code style requirements.
- Use ES module syntax.
- Use TypeScript.
- Use Zod for input validation at API boundaries.
- Do not use emojis in code/comments/docs.

## Workflow And Safety

1. Validate changes before handoff.
- Run `pnpm typecheck` after meaningful code changes.
- Run `pnpm lint` after meaningful code changes.

2. Documentation hygiene.
- Update docs when setup/build/env behavior changes.
- Keep `AGENTS.md` thin. Put durable shared rules here.

3. Security basics.
- No hardcoded secrets.
- Use environment variables for sensitive values.
- Never commit `.env` files.
