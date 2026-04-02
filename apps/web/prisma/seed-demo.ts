import { PrismaClient } from "@prisma/client";
import { seedDemo } from "./seed-lib";

const db = new PrismaClient();

async function main() {
	const { baselineEmail, demoEmail } = await seedDemo(db);
	console.log(`Seeded baseline user: ${baselineEmail}`);
	console.log(`Seeded demo user: ${demoEmail}`);
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(() => db.$disconnect());
