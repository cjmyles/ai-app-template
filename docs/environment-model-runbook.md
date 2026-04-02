# Environment Model, Delivery Lanes, And Seeding

This document is the canonical runbook for how the template maps local
development, hosted environments, database changes, seed profiles, and native
distribution.

The template currently defaults to Prisma `db push` in a greenfields mode.
Schema changes and seed changes are therefore operational concerns and should be
treated as part of the environment model, not only as code changes.

## Canonical Environment Names

Use these three canonical environment names:

- `local`
- `staging`
- `production`

In plain English:

- `local` is developer-only work on a local machine
- `staging` is the shared non-production QA and integration lane
- `production` is the live user-facing lane

Preview deployments are useful for branch review, but they are not the same as
the shared staging lane.

## Recommended Operating Model

| Environment lane | Git branch | Hosted environment | Database target | Intended purpose |
| --- | --- | --- | --- | --- |
| `local` | any local checkout | local CLI / dev server | local Postgres | fastest iteration loop |
| `preview` | feature branches / PR branches | preview deployment | non-production preview database or branch | branch review, isolated validation |
| `staging` | `main` | shared non-production deployment | shared non-production database | QA, integration, installable internal builds |
| `production` | `main` | production deployment | production database | live traffic |

## Git And Release Flow

Recommended flow:

1. Build and test locally.
2. Push feature work to a short-lived branch.
3. Use preview deployments for branch review.
4. Merge validated work into `main`.
5. Let `main` feed the shared staging environment.
6. Promote validated staging code to production intentionally.

This keeps `main` as the long-lived integration branch while still preserving a
stable shared QA lane.

## Database Workflow

### Greenfields Mode

This template defaults to a greenfields `db push` workflow:

- use `pnpm db:push` for schema application
- use `pnpm db:push:force-reset` only for disposable environments
- do not commit Prisma migrations while the project is in this mode

The lint guard enforces the no-migrations rule. If you intentionally graduate
the project to a migration-based workflow later, remove that guard and update
this runbook plus the README together.

### Seed Profiles

The template ships with two seed profiles:

- `baseline`
- `demo`

Use them as follows:

- `pnpm db:seed:baseline` for minimal local/staging bootstrapping
- `pnpm db:seed:demo` for a slightly richer local development dataset

Recommended policy:

- `local` may use either profile
- `staging` may use either profile if the team agrees
- `production` should only use `baseline`, if seeding is used at all

## Local Environment Files

All local app commands read from the repo root `.env`.

Current local expectations:

- `DATABASE_URL` for Prisma
- `AUTH_SECRET` and `AUTH_URL` for the web app
- `EXPO_PUBLIC_API_URL` for the native app
- optional seed overrides such as `SEED_EMAIL` and `SEED_DEMO_EMAIL`

Do not create app-local `.env` files for normal local development. Hosted
builds may still use their platform-specific environment-variable systems.

## Hosted Environments

Use whatever provider best fits your stack, but keep the environment model
concepts separate:

- hosted application environments decide which build/runtime variables a deploy
  receives
- database environments or branches decide which database the app connects to
- CI/CD environments decide which secrets operational workflows receive

Those systems often map to different products and should not be conflated.

## Native Build Profiles

For Expo / EAS style delivery, the recommended profile mapping is:

- `development` -> local development against `local`
- `preview` -> internal QA build pointed at `staging`
- `production` -> release build pointed at `production`

Installable mobile builds are delivery channels, not environments. The real
boundary is which backend and database the build points at.

## GitHub Workflows

This template includes optional operational workflows for:

- database connectivity checks
- database maintenance / seed execution

These workflows expect GitHub Environments such as `Staging` and `Production`
to hold the right `DATABASE_URL` secret values. They do not auto-discover the
correct database target.
