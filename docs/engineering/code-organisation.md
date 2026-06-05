# Code Organisation

This template uses a feature-first structure for app code and small shared
workspace packages for cross-app contracts.

## Web App

New Next.js App Router projects should prefer this structure:

```text
apps/web/src/app/
apps/web/src/features/
apps/web/src/lib/
apps/web/src/components/
apps/web/src/hooks/
```

Existing projects may start with `apps/web/app` and `apps/web/lib`; migrate only
when the project has a reason to consolidate under `src`.

## Feature Folders

Feature folders with more than one file use this fixed shape:

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

- `components/` - React components scoped to the feature.
- `hooks/` - React hooks scoped to the feature.
- `server/` - server-only logic, database access, route-handler helpers,
  background job helpers, and secret reads.
- `client/` - browser-only helpers.
- `shared/` - pure isomorphic helpers with no environment access.
- `types.ts` - feature-local TypeScript types.
- `schemas.ts` - feature-local Zod schemas.

Avoid `services/` and `lib/` inside feature roots. Those names become catch-all
folders quickly. Use the layer name that describes where the code can run.

## `apps/web/src/lib`

`apps/web/src/lib` is only generic infrastructure:

- environment readers
- auth/session helpers
- SDK clients
- HTTP, CORS, and error helpers
- app-wide utilities used by multiple features

Do not put feature logic, DTO shaping, React hooks, UI state, or product rules in
`lib`.

## Imports

- Avoid feature-root barrels that mix server and client code.
- Import by layer, for example `@/features/billing/server/...` or
  `@/features/billing/components/...`.
- Client components and hooks must not import a feature's `server/` folder.
- Layer-level barrels are allowed when they stay within one runtime boundary.

## Tests

Tests live in `__tests__` folders that mirror the source:

```text
apps/web/src/features/example/server/example.ts
apps/web/src/features/example/server/__tests__/example.test.ts
```

Use the same pattern for shared packages. Avoid top-level `tests/` folders and
sibling `*.test.ts` files for new code.
