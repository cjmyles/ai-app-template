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

### SEO Maintenance

- Preserve and extend the template SEO foundation in `apps/web/lib/seo` rather than scattering metadata rules across pages.
- Keep `apps/web/app/robots.ts` and `apps/web/app/sitemap.ts` present and aligned with the actual public route surface.
- Add metadata, canonical URLs, Open Graph tags, and Twitter metadata for every new public page.
- Add structured data when a public page is important enough to stand on its own in search or sharing contexts.
- Mark private, authenticated, and internal routes as `noindex` and keep them out of crawl surfaces.
- Prefer `next/font` over external font CDN links.
- Update sitemap entries and crawl rules whenever public routes are added or removed.
- Do not ship public pages without metadata.
- After SEO-related changes, run `pnpm typecheck && pnpm lint`.
