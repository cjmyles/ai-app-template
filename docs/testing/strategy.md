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

- `pnpm validate:fast` - lightweight web-focused validation for fast iteration
  on web UI, copy, and display changes.
- `pnpm validate:pr` - final pre-commit, pre-push, and pre-PR gate. Runs the
  repo-wide typecheck and lint suite.
- `pnpm validate:final` - compatibility alias for `pnpm validate:pr`.
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm check:ci`

## Workflow Levels

Fast work mode is the default. Make the requested change, then run the smallest
useful validation for that change. For web-only UI, copy, or display work, use
`pnpm validate:fast` unless a narrower focused check is more appropriate.

PR prep mode starts only when the user asks to commit, push, open/update a PR, or
says the work is ready. Run `pnpm validate:pr` on the final working tree before
staging. If files are added, renamed, deleted, or validation scripts change after
that run, rerun `pnpm validate:pr`.

Deployment mode starts only when the user asks for deploy verification,
production checks, or failed-deployment investigation. Do not run deploy checks
or polling as part of normal fast work.

Document any skipped command in the PR body with the reason.
