# AGENTS

## Canonical Shared Rules

All cross-assistant implementation rules live in:

- `docs/ai-shared-instructions.md`

## Agent-Specific Additions

Use this file only for assistant-specific additions that are not broadly
applicable to every coding assistant working in the template.

### Template Guardrails

- Keep the repo-wide `pnpm typecheck` and `pnpm lint` checks in place.
- Keep Biome as the formatter/linter. Do not add Prettier or ESLint.
- Preserve the `no default exports unless framework-required` rule.
