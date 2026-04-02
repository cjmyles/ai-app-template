import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [, , command, ...args] = process.argv;

if (!command) {
	console.error(
		"Usage: node scripts/run-with-root-env.mjs <command> [...args]",
	);
	process.exit(1);
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootEnvPath = path.resolve(scriptDir, "..", ".env");

if (existsSync(rootEnvPath)) {
	process.loadEnvFile(rootEnvPath);
}

const child = spawn(command, args, {
	stdio: "inherit",
	env: process.env,
	shell: process.platform === "win32",
});

child.on("error", (error) => {
	console.error(error);
	process.exit(1);
});

child.on("exit", (code) => {
	process.exit(code ?? 1);
});
