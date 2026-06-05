#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PATHS=(
	"apps/web/app"
	"apps/web/src"
	"apps/native/app"
	"packages/ui/src"
)

EXCLUDES=(
	":(exclude)packages/ui/src/tokens/**"
)

PATTERN='#[[:xdigit:]]{3,8}|rgb\(|rgba\(|hsl\(|hsla\(|oklch\(|\[[^]]*#[[:xdigit:]]{3,8}'

HITS="$(git grep -nE "$PATTERN" -- "${PATHS[@]}" "${EXCLUDES[@]}" 2>/dev/null || true)"

if [[ -n "$HITS" ]]; then
	echo "Raw color values found outside token files:"
	echo "$HITS"
	echo "Move shared color values to packages/ui/src/tokens or use token-backed helpers."
	exit 1
fi

echo "Raw color guard passed."
