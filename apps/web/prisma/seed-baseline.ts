import { PrismaClient } from "@prisma/client";
import { seedBaseline } from "./seed-lib";

const db = new PrismaClient();

async function main() {
	const { email } = await seedBaseline(db);
	console.log(`Seeded baseline user: ${email}`);
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(() => db.$disconnect());
