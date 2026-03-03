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
		<main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
			<h1 className="text-4xl font-bold">AI App Template</h1>
			<form action={handleSignIn} className="flex w-80 flex-col gap-4">
				<input
					type="email"
					name="email"
					placeholder="Email"
					required
					className="rounded border px-4 py-2"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					required
					className="rounded border px-4 py-2"
				/>
				<button
					type="submit"
					className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					Sign in
				</button>
			</form>
		</main>
	);
}
