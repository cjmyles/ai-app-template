#!/usr/bin/env node

const { execSync } = require("node:child_process");

function check(name, fn) {
	try {
		fn();
		console.log(`OK   ${name}`);
	} catch (error) {
		const message = error?.message ? error.message : String(error);
		console.error(`FAIL ${name}`);
		console.error(message);
		process.exitCode = 1;
	}
}

check("Node version is >= 20.19.4 and < 21", () => {
	const [major, minor, patch] = process.versions.node.split(".").map(Number);
	const isAtLeastRequired =
		major > 20 ||
		(major === 20 && (minor > 19 || (minor === 19 && patch >= 4)));
	const isSupportedMajor = major === 20;

	if (!isAtLeastRequired || !isSupportedMajor) {
		throw new Error(`Expected Node 20.19.4+ (20.x), found ${process.version}`);
	}
});

check("Babel config loads", () => {
	const babel = require("@babel/core");
	const entry = require.resolve("expo-router/entry");
	const config = babel.loadPartialConfig({
		filename: entry,
		cwd: process.cwd(),
	});
	if (!config || !config.options) {
		throw new Error("Babel did not return a config");
	}
});

check("Reanimated plugin resolves", () => {
	require.resolve("react-native-reanimated/plugin");
});

check("Expo public config resolves", () => {
	execSync("pnpm exec expo config --type public", { stdio: "ignore" });
});

if (process.exitCode) {
	process.exit(process.exitCode);
}

console.log("Native doctor passed");
