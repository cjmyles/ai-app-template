import { Button, NoticeCard, Text } from "@repo/ui";
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
		<main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-neutral-50 p-8">
			<div className="w-full max-w-md space-y-6">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold text-neutral-950">Dashboard</h1>
					<Text className="text-neutral-600">
						Welcome, {session.user?.email}
					</Text>
				</div>
				<NoticeCard
					tone="success"
					title="Signed in"
					description="The template is using shared contracts, shared UI, and the root .env workflow."
				/>
			</div>
			<form action={handleSignOut}>
				<Button type="submit" variant="destructive">
					Sign out
				</Button>
			</form>
		</main>
	);
}
