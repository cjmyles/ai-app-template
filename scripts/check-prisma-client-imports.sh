#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PATTERN="@prisma/client"
FAIL=0

git_grep_paths() {
	git grep -n "$PATTERN" -- "$@" ':(exclude)**/package.json' || true
}

NATIVE_HITS="$(git_grep_paths apps/native)"
if [[ -n "$NATIVE_HITS" ]]; then
	echo "Forbidden @prisma/client import(s) found in apps/native:"
	echo "$NATIVE_HITS"
	FAIL=1
fi

WEB_HITS="$(git_grep_paths \
	apps/web \
	':(exclude)apps/web/prisma/**' \
	':(exclude)apps/web/lib/db.ts' \
	':(exclude)apps/web/app/api/**')"
if [[ -n "$WEB_HITS" ]]; then
	echo "Forbidden @prisma/client import(s) found in apps/web outside approved server boundaries:"
	echo "$WEB_HITS"
	FAIL=1
fi

PACKAGE_HITS="$(git_grep_paths packages)"
if [[ -n "$PACKAGE_HITS" ]]; then
	echo "Forbidden @prisma/client import(s) found in shared packages:"
	echo "$PACKAGE_HITS"
	FAIL=1
fi

if [[ "$FAIL" -ne 0 ]]; then
	exit 1
fi

echo "Prisma client import guard passed."
