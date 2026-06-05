import { Button, Input, NoticeCard } from "@repo/ui";
import { signIn } from "@/lib/auth";
import {
	buildPageMetadata,
	buildWebsiteStructuredData,
	siteConfig,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
	description:
		"A reusable Next.js and Expo starter with shared UI, authentication scaffolding, and crawl-safe SEO defaults.",
	path: siteConfig.routes.home,
});

const starterHighlights = [
	{
		title: "Crawl-safe defaults",
		description:
			"Canonical helpers, robots, sitemap, and social preview routes are wired into the App Router scaffold.",
	},
	{
		title: "Shared building blocks",
		description:
			"Web and native apps reuse shared UI primitives, shared schemas, and strict TypeScript contracts.",
	},
	{
		title: "Ready to customize",
		description:
			"Site name, domain, description, and social preview details live in one SEO config for future projects.",
	},
] as const;

export default function HomePage() {
	async function handleSignIn(formData: FormData) {
		"use server";
		const email = formData.get("email");
		const password = formData.get("password");
		if (typeof email !== "string" || typeof password !== "string") return;
		await signIn("credentials", { email, password, redirectTo: "/dashboard" });
	}

	const websiteStructuredData = JSON.stringify(buildWebsiteStructuredData());

	return (
		<main className="bg-neutral-50 px-4 py-12">
			<div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
				<section className="space-y-8">
					<div className="space-y-4">
						<span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
							Reusable project foundation
						</span>
						<div className="space-y-3">
							<h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
								{siteConfig.name}
							</h1>
							<p className="max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
								{siteConfig.description}
							</p>
						</div>
					</div>
					<div className="grid gap-4 sm:grid-cols-3">
						{starterHighlights.map((item) => (
							<section
								key={item.title}
								className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
							>
								<h2 className="text-sm font-semibold text-neutral-950">
									{item.title}
								</h2>
								<p className="mt-2 text-sm leading-6 text-neutral-600">
									{item.description}
								</p>
							</section>
						))}
					</div>
				</section>
				<section className="w-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
					<div className="space-y-6">
						<div className="space-y-2 text-center">
							<h2 className="text-2xl font-semibold text-neutral-950">
								Sign in locally
							</h2>
							<p className="text-sm leading-6 text-neutral-600">
								Use the built-in demo account to validate the scaffold before
								customizing it for a real project.
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
				</section>
			</div>
			<script type="application/ld+json">{websiteStructuredData}</script>
		</main>
	);
}
