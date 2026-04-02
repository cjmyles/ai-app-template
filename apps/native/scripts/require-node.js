#!/usr/bin/env node

function parseVersion(version) {
	const [major, minor, patch] = version.split(".").map(Number);
	return { major, minor, patch };
}

function isSupportedNode(version) {
	const { major, minor, patch } = parseVersion(version);
	if (major !== 20) return false;
	if (minor > 19) return true;
	if (minor < 19) return false;
	return patch >= 4;
}

const current = process.versions.node;

if (!isSupportedNode(current)) {
	console.error(
		`Unsupported Node ${process.version}. Expo SDK 54 requires Node >=20.19.4 and <21.\n` +
			"Run `nvm use` (or install Node 20.19.5) and reinstall dependencies with `pnpm install`.",
	);
	process.exit(1);
}
