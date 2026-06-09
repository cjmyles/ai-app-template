#!/usr/bin/env node

function parseVersion(version) {
	const [major, minor, patch] = version.split(".").map(Number);
	return { major, minor, patch };
}

function isSupportedNode(version) {
	const { major } = parseVersion(version);
	return major === 22;
}

const current = process.versions.node;

if (!isSupportedNode(current)) {
	console.error(
		`Unsupported Node ${process.version}. This template requires Node 22.x.\n` +
			"Run `nvm use` and reinstall dependencies with `pnpm install`.",
	);
	process.exit(1);
}
