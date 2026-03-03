import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { NextConfig } from "next";

// Load root .env so Next.js picks up shared monorepo env vars
const rootEnvPath = resolve(__dirname, "../../.env");
if (existsSync(rootEnvPath)) {
	for (const line of readFileSync(rootEnvPath, "utf-8").split("\n")) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;
		const eqIdx = trimmed.indexOf("=");
		if (eqIdx === -1) continue;
		const key = trimmed.slice(0, eqIdx).trim();
		const val = trimmed
			.slice(eqIdx + 1)
			.trim()
			.replace(/^["']|["']$/g, "");
		if (!(key in process.env)) process.env[key] = val;
	}
}

const nextConfig: NextConfig = {};

export default nextConfig;
