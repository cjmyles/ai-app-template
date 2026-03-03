import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
	const email = process.env.SEED_EMAIL ?? "dev@example.com";
	await db.user.upsert({ where: { email }, create: { email }, update: {} });
	console.log(`Seeded user: ${email}`);
	// TODO production upgrade: add `passwordHash String` to schema.prisma,
	// hash with bcrypt/argon2 here, verify in lib/auth.ts authorize()
}

main()
	.catch(console.error)
	.finally(() => db.$disconnect());
