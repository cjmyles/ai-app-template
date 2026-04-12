#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

FAIL=0

is_exempt_path() {
	local path="$1"

	if [[ "$path" == *"/components/"* ]]; then
		return 0
	fi

	if [[ "$path" == *"/hooks/"* ]]; then
		return 0
	fi

	return 1
}

while IFS= read -r file; do
	[[ -z "$file" ]] && continue

	if is_exempt_path "$file"; then
		continue
	fi

	basename="${file##*/}"
	if [[ "$basename" == _* ]] || [[ "$basename" == *"["* ]]; then
		continue
	fi

	stem="${basename%.*}"

	if [[ ! "$stem" =~ ^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*$ ]]; then
		if [[ "$FAIL" -eq 0 ]]; then
			echo "Found non-kebab TypeScript filenames (outside exempt paths):"
		fi
		echo "  - $file"
		FAIL=1
	fi
done < <(
	find . \
		-type f \
		\( -name '*.ts' -o -name '*.tsx' \) \
		-not -path '*/node_modules/*' \
		-not -path '*/.next/*' \
		-not -path '*/dist/*' \
		-not -path '*/coverage/*' \
		-print | LC_ALL=C sort
)

if [[ "$FAIL" -ne 0 ]]; then
	echo
	echo "Rule: use kebab-case for .ts/.tsx files unless exempt (*/components/**, */hooks/**)."
	exit 1
fi

echo "File naming guard passed."
