import { Button, Input, NoticeCard } from "@repo/ui";
import { signIn } from "@/lib/auth";

export default function HomePage() {
	async function handleSignIn(formData: FormData) {
		"use server";
		const email = formData.get("email");
		const password = formData.get("password");
		if (typeof email !== "string" || typeof password !== "string") return;
		await signIn("credentials", { email, password, redirectTo: "/dashboard" });
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
			<div className="w-full max-w-sm space-y-6">
				<div className="space-y-2 text-center">
					<h1 className="text-4xl font-bold text-neutral-950">
						AI App Template
					</h1>
					<p className="text-sm leading-6 text-neutral-600">
						A Next.js + Expo starter with shared types, shared UI, and hardened
						repo conventions.
					</p>
				</div>
				<NoticeCard
					title="Local demo credentials"
					description="Run `pnpm db:seed:demo`, then sign in with dev@example.com and any non-empty password."
				/>
				<form action={handleSignIn} className="space-y-4">
					<Input type="email" name="email" placeholder="Email" required />
					<Input
						type="password"
						name="password"
						placeholder="Password"
						required
					/>
					<Button type="submit" className="w-full">
						Sign in
					</Button>
				</form>
				<p className="text-center text-sm text-neutral-500">
					Local app commands load environment variables from the repo root
					`.env`.
				</p>
			</div>
		</main>
	);
}
