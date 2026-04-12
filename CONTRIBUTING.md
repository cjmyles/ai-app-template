# Contributing

## Git Workflow

- Create feature branches from the latest `main`.
- Open focused pull requests and prefer squash merge when merging to `main`.
- After a PR is squash-merged, do not keep building on the old feature branch.
- For any follow-up change, switch back to updated `main`, pull, and create a
  new branch.

Why:

- squash merge keeps `main` history clean
- but it also means the original feature branch commit is not the exact commit
  on `main`
- starting the next change from fresh `main` avoids confusing ancestry and
  duplicate commits in later pull requests

## UI Component Rules

Use `@repo/ui` for reusable UI primitives and shared visual patterns.

A UI element belongs in `packages/ui` if any of these are true:

- It will be reused in 2+ screens.
- It expresses a common visual pattern such as a notice, empty state, field
  wrapper, or action row.
- It must share tokenized spacing, typography, and colors across web and
  native.

Keep app-level code (`apps/native`, `apps/web`) for feature compositions and
workflow-specific components.

- Good: a sign-in screen composed from `Button`, `Input`, and `NoticeCard`.
- Not good: ad hoc primitive styles duplicated across multiple screens.

### Color And Token Policy

- Do not introduce raw hex colors outside `packages/ui/src/tokens/*`.
- Add missing shared colors in `packages/ui` before using them in apps.

### PR Checklist

Before opening a PR:

- [ ] Reusable patterns extracted to `@repo/ui`.
- [ ] Shared types live in `@repo/types`.
- [ ] Business validation / decision logic lives in `@repo/validation`.
- [ ] `pnpm validate:final` passes on the exact tree being committed.
- [ ] If any files were added, renamed, deleted, or any lint/typecheck scripts changed, `pnpm validate:final` was rerun after those final filesystem changes.
