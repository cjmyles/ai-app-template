# Agent Rules (ai-app-template)

## Non-negotiables
- Use pnpm workspaces.
- TypeScript strict mode everywhere; do not relax compiler options.
- Use Biome for formatting + linting; do not add Prettier/ESLint unless explicitly requested.
- Keep the repo deterministic: no unnecessary files, no surprise deps.
- No default exports unless a framework requires it.

## Where code goes
### packages/ui
- Only shared primitives (Button, Text, Stack, Card, Input, Select, Badge, Icon wrapper, Modal/Sheet, Toast).
- No feature components, no screen-specific layouts, no business logic.

### apps/web
- Next.js app (App Router), Auth.js, API routes/route handlers, Prisma usage.
- Web-only UI and feature components.

### apps/native
- Expo app, navigation, device APIs.
- Native-only UI and feature components (e.g. list rows with status + actions).

### packages/types
- Shared domain types and schemas that are genuinely cross-app.
- No DB models or Prisma types re-exported.

## PR discipline
- Small PRs.
- Include a brief summary, test notes, and any follow-ups in the PR description.
EOF