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

check("Node version is 22.x", () => {
	const [major] = process.versions.node.split(".").map(Number);

	if (major !== 22) {
		throw new Error(`Expected Node 22.x, found ${process.version}`);
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
