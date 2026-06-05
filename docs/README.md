# Documentation

This folder keeps durable project knowledge out of issue threads and PR notes.
Prefer short, maintained docs over long one-off explanations.

## Structure

- `engineering/` - coding standards, dependency rules, repo workflow, Prisma
  conventions, and AI-assistant guardrails.
- `architecture/` - system shape, app boundaries, route organization,
  data-flow notes, and integration decisions.
- `testing/` - test strategy, smoke checks, fixtures, release validation, and
  known manual verification paths.
- `work-plans/` - active implementation plans and archived plans that are still
  useful as historical context.

## Maintenance Rules

- Update the durable doc when a change affects setup, architecture, validation,
  testing, data model conventions, or contribution workflow.
- Keep work plans temporary. When implementation finishes, move durable behavior
  into `engineering/`, `architecture/`, or `testing/`.
- Keep package README files focused on package ownership and public APIs. Link
  back here instead of duplicating long-form project guidance.
- Do not add project-specific customer, vendor, compliance, or operational
  details to this template.
