# Architecture Overview

This repository is a pnpm monorepo starter for a production app that can include
web, native, and shared packages.

## Apps

- `apps/web` - Next.js App Router app.
- `apps/native` - Expo app with development, preview, and production variants.

## Shared Packages

- `packages/ui` - neutral cross-platform primitives and design tokens.
- `packages/types` - cross-app TypeScript types and Zod schemas.
- `packages/validation` - reusable pure validation helpers.

## Boundaries

- App-specific feature code stays in the app.
- Cross-app contracts move to `packages/types`.
- Cross-app validation logic moves to `packages/validation`.
- Neutral UI primitives move to `packages/ui`.
- Database clients and server-only SDKs stay out of native, UI, and shared
  packages.
