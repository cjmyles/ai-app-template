import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const schemaPath = path.join(rootDir, "apps/web/prisma/schema.prisma");
const outputPath = path.join(rootDir, "packages/types/src/generated-enums.ts");

function toCamelCase(name) {
	return name[0].toLowerCase() + name.slice(1);
}

function parseEnumValues(enumBody) {
	return enumBody
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0 && !line.startsWith("//"))
		.map((line) => line.split(/\s+/)[0])
		.filter(Boolean);
}

function buildOutput(schema) {
	const enumPattern = /^enum\s+([A-Za-z][A-Za-z0-9_]*)\s*\{([\s\S]*?)^\}/gm;
	const enums = [];

	for (const match of schema.matchAll(enumPattern)) {
		const enumName = match[1];
		const enumBody = match[2];
		const enumValues = parseEnumValues(enumBody);

		if (enumValues.length > 0) {
			enums.push({ name: enumName, values: enumValues });
		}
	}

	let output =
		"// AUTO-GENERATED FILE. DO NOT EDIT.\n" +
		"// Source: apps/web/prisma/schema.prisma\n" +
		"// Run: pnpm gen:types:enums\n\n";

	if (enums.length === 0) {
		output += "// No Prisma enums are currently defined.\n\nexport {};\n";
		return output;
	}

	for (const enumDef of enums) {
		const valuesName = `${toCamelCase(enumDef.name)}Values`;
		output += `export const ${valuesName} = [\n`;
		for (const enumValue of enumDef.values) {
			output += `\t"${enumValue}",\n`;
		}
		output += `] as const;\n`;
		output += `export type ${enumDef.name} = (typeof ${valuesName})[number];\n\n`;
	}

	return output;
}

const schema = fs.readFileSync(schemaPath, "utf8");
const nextOutput = `${buildOutput(schema).trimEnd()}\n`;
const checkMode = process.argv.includes("--check");
const currentOutput = fs.existsSync(outputPath)
	? fs.readFileSync(outputPath, "utf8")
	: "";

if (checkMode) {
	if (currentOutput !== nextOutput) {
		console.error("Generated enums are out of date. Run: pnpm gen:types:enums");
		process.exit(1);
	}
	process.exit(0);
}

if (currentOutput !== nextOutput) {
	fs.writeFileSync(outputPath, nextOutput);
}
