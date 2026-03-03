import { Text } from "@repo/ui";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";

export default async function DashboardPage() {
	const session = await auth();
	if (!session) redirect("/");

	async function handleSignOut() {
		"use server";
		await signOut({ redirectTo: "/" });
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
			<h1 className="text-3xl font-bold">Dashboard</h1>
			<Text className="text-gray-600">Welcome, {session.user?.email}</Text>
			<form action={handleSignOut}>
				<button
					type="submit"
					className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
				>
					Sign out
				</button>
			</form>
		</main>
	);
}
