#!/usr/bin/env bash

set -euo pipefail

if find "apps/web/prisma/migrations" -type f -print -quit 2>/dev/null | grep -q .; then
	echo "Committed Prisma migrations are blocked in greenfields mode. Use db push for now."
	exit 1
fi
