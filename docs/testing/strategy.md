# Testing Strategy

Use the smallest test that gives confidence in the changed behavior.

## Layers

- Unit tests for pure helpers, schemas, and validation logic.
- Component tests for reusable UI behavior.
- Integration tests for API boundaries and data-shaping code.
- Smoke checks for native and browser flows that depend on runtime wiring.

## Placement

Put tests in `__tests__` folders near the source they cover.

## Validation Commands

- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm check:ci`
- `pnpm validate:final` before commit, push, or PR creation

Document any skipped command in the PR body with the reason.
