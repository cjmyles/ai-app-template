import type { PrismaClient } from "@prisma/client";
import { resolveSeedEmail } from "@repo/validation";

export async function seedBaseline(db: PrismaClient) {
	const email = resolveSeedEmail(process.env.SEED_EMAIL, "dev@example.com");
	await db.user.upsert({ where: { email }, create: { email }, update: {} });
	return { email };
}

export async function seedDemo(db: PrismaClient) {
	const { email: baselineEmail } = await seedBaseline(db);
	const demoEmail = resolveSeedEmail(
		process.env.SEED_DEMO_EMAIL,
		"demo@example.com",
	);

	if (demoEmail !== baselineEmail) {
		await db.user.upsert({
			where: { email: demoEmail },
			create: { email: demoEmail },
			update: {},
		});
	}

	return { baselineEmail, demoEmail };
}
