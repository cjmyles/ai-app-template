const path = require("node:path");

const [major] = process.versions.node.split(".").map(Number);
const isSupportedNode = major === 22;

if (!isSupportedNode) {
	throw new Error(
		`Unsupported Node ${process.version}. This template requires Node 22.x. Run \`nvm use\`.`,
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
