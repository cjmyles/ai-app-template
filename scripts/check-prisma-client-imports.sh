#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PATTERN="from ['\"]@prisma/client['\"]"
FAIL=0

NATIVE_HITS="$(rg --line-number --no-heading "$PATTERN" apps/native || true)"
if [[ -n "$NATIVE_HITS" ]]; then
	echo "Forbidden @prisma/client import(s) found in apps/native:"
	echo "$NATIVE_HITS"
	FAIL=1
fi

WEB_HITS="$(rg --line-number --no-heading "$PATTERN" apps/web \
	-g '!apps/web/prisma/**' \
	-g '!apps/web/lib/db.ts' \
	-g '!apps/web/app/api/**' || true)"
if [[ -n "$WEB_HITS" ]]; then
	echo "Forbidden @prisma/client import(s) found in apps/web outside approved server boundaries:"
	echo "$WEB_HITS"
	FAIL=1
fi

PACKAGE_HITS="$(rg --line-number --no-heading "$PATTERN" packages || true)"
if [[ -n "$PACKAGE_HITS" ]]; then
	echo "Forbidden @prisma/client import(s) found in shared packages:"
	echo "$PACKAGE_HITS"
	FAIL=1
fi

if [[ "$FAIL" -ne 0 ]]; then
	exit 1
fi

echo "Prisma client import guard passed."
