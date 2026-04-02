#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

SCHEMA_PATH="apps/web/prisma/schema.prisma"
TYPES_PREFIX="packages/types/src/"

BASE_REF="${PRISMA_TYPES_GUARD_BASE_REF:-}"

if [[ -n "$BASE_REF" ]]; then
	RANGE="${BASE_REF}...HEAD"
elif git rev-parse --verify origin/main >/dev/null 2>&1; then
	RANGE="origin/main...HEAD"
elif git rev-parse --verify HEAD~1 >/dev/null 2>&1; then
	RANGE="HEAD~1..HEAD"
else
	RANGE=""
fi

CHANGED_FILES=""

if [[ -n "$RANGE" ]]; then
	CHANGED_FILES+=$'\n'"$(git diff --name-only "$RANGE" || true)"
fi

CHANGED_FILES+=$'\n'"$(git diff --name-only || true)"
CHANGED_FILES+=$'\n'"$(git diff --cached --name-only || true)"

CHANGED_FILES="$(printf "%s\n" "$CHANGED_FILES" | sed '/^$/d' | sort -u)"

SCHEMA_CHANGED=0
TYPES_CHANGED=0

if printf "%s\n" "$CHANGED_FILES" | grep -qx "$SCHEMA_PATH"; then
	SCHEMA_CHANGED=1
fi

if printf "%s\n" "$CHANGED_FILES" | grep -q "^${TYPES_PREFIX}"; then
	TYPES_CHANGED=1
fi

if [[ "$SCHEMA_CHANGED" -eq 1 && "$TYPES_CHANGED" -eq 0 ]]; then
	echo "Prisma schema changed without shared types updates."
	echo "Changed schema: $SCHEMA_PATH"
	echo "Expected at least one change under: $TYPES_PREFIX"
	echo "Update @repo/types contracts / enums for schema changes."
	exit 1
fi

echo "Prisma-to-types sync guard passed."
