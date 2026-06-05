# Prisma Organisation

This template includes lightweight Prisma scaffolding, but projects should only
grow database conventions when they actually need them.

## Boundaries

- `@prisma/client` imports belong in approved web server boundaries only.
- Do not import Prisma from native code, shared packages, UI packages, client
  components, or browser helpers.
- Shared enum literals and cross-app contracts belong in `packages/types`, not
  in direct Prisma client imports.

## Suggested Layout

For projects that use Prisma heavily, organize `apps/web/prisma` like this:

```text
apps/web/prisma/
  schema.prisma
  migrations/
  lib/
  seeds/
    baseline/
    test/
  scripts/
  diagnostics/
```

- `schema.prisma` is the model source of truth.
- `migrations/` contains committed Prisma migration output when the project is
  ready for migration-based schema changes.
- `lib/` contains shared Prisma-layer helpers used by more than one seed,
  script, or diagnostic.
- `seeds/baseline/` contains idempotent data required for the app to function.
- `seeds/test/` contains local, QA, and demo datasets. Do not run these in
  production.
- `scripts/` contains intentional database mutations that are not fixture
  seeds.
- `diagnostics/` contains read-only inspection scripts.

## Migration Hygiene

- Keep migrations committed once the project has durable schema history.
- Do not hand-write TypeScript scripts inside `migrations/`.
- If the template is still in greenfield mode, `db push` may be acceptable and a
  guard can block accidental committed migrations.
- SQL-expressible data changes that are part of a schema change should live in
  the migration that needs them.
- TypeScript operational fixes belong in `scripts/`, should be idempotent when
  possible, and should be deleted when no longer needed.

## Guards

The root lint script runs lightweight guards for Prisma boundaries and migration
hygiene. Keep them opt-in and cheap so projects that do not need Prisma can
remove the package without inheriting heavy database requirements.
