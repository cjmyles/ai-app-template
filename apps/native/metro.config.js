const path = require("node:path");

const [major, minor, patch] = process.versions.node.split(".").map(Number);
const isSupportedNode =
	major === 20 && (minor > 19 || (minor === 19 && patch >= 4));

if (!isSupportedNode) {
	throw new Error(
		`Unsupported Node ${process.version}. Expo SDK 54 requires Node >=20.19.4 and <21. Run \`nvm use\`.`,
	);
}

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");
const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, "node_modules"),
	path.resolve(workspaceRoot, "node_modules"),
];
config.resolver.disableHierarchicalLookup = true;
config.resolver.unstable_enableSymlinks = true;

module.exports = withNativeWind(config, {
	input: "./global.css",
	configPath: "./tailwind.config.js",
});
