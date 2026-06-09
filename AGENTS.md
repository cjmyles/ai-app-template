# AGENTS

## Canonical Shared Rules

All cross-assistant implementation rules live in:

- `docs/engineering/ai-shared-instructions.md`

## Agent-Specific Additions

Use this file only for assistant-specific additions that are not broadly
applicable to every coding assistant working in the template.

### Template Guardrails

- Keep the repo-wide `pnpm typecheck` and `pnpm lint` checks in place.
- Fast work mode is the default for normal implementation, UI tweaks, copy
  changes, debugging, and review iterations.
- In fast work mode, make the requested change and run the smallest useful
  validation for the changed behavior. For web-only UI, copy, or display
  changes, prefer `pnpm validate:fast`.
- Do not run deployment checks, deployment polling, commit, push, or PR ceremony
  unless explicitly requested or investigating a failed deployment.
- PR prep mode starts only when the user asks to commit, push, open/update a PR,
  or says the work is ready.
- Run `pnpm validate:pr` on the final working tree immediately before any
  commit, push, or PR creation. `pnpm validate:final` is a compatibility alias
  for the same final gate.
- If files were added, renamed, deleted, or lint/typecheck scripts changed,
  rerun `pnpm validate:pr` after those last filesystem changes. Do not rely on
  earlier passing runs.
- Keep Biome as the formatter/linter. Do not add Prettier or ESLint.
- Preserve the `no default exports unless framework-required` rule.

### SEO Maintenance

- Preserve and extend the template SEO foundation in `apps/web/lib/seo` rather than scattering metadata rules across pages.
- Keep `apps/web/app/robots.ts` and `apps/web/app/sitemap.ts` present and aligned with the actual public route surface.
- Add metadata, canonical URLs, Open Graph tags, and Twitter metadata for every new public page.
- Add structured data when a public page is important enough to stand on its own in search or sharing contexts.
- Mark private, authenticated, and internal routes as `noindex` and keep them out of crawl surfaces.
- Prefer `next/font` over external font CDN links.
- Update sitemap entries and crawl rules whenever public routes are added or removed.
- Do not ship public pages without metadata.
- During fast work, run the smallest useful SEO validation. Before commit, push,
  or PR, run `pnpm validate:pr`.
