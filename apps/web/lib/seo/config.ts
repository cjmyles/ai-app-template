import { colors } from "@repo/ui";

function normalizeSiteUrl(value: string | undefined) {
	if (!value) return null;

	try {
		return new URL(value).origin;
	} catch {
		return null;
	}
}

const configuredSiteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const fallbackSiteUrl = "https://example.com";
const siteName = "Starter App";
const shortName = "Starter";
const defaultDescription =
	"A reusable foundation for Next.js and Expo apps with shared UI, strict TypeScript, authentication scaffolding, and crawl-ready defaults.";

// Customize these placeholder values after scaffolding a new project.
export const siteConfig = {
	name: siteName,
	shortName,
	applicationName: siteName,
	defaultTitle: siteName,
	titleTemplate: `%s | ${siteName}`,
	description: defaultDescription,
	language: "en",
	locale: "en_US",
	keywords: [
		"Next.js template",
		"Expo starter",
		"pnpm monorepo",
		"shared UI",
		"TypeScript strict mode",
	],
	siteUrl: configuredSiteUrl,
	hasConfiguredSiteUrl: configuredSiteUrl !== null,
	metadataBase: new URL(configuredSiteUrl ?? fallbackSiteUrl),
	themeColor: colors.primary[600],
	backgroundColor: colors.white,
	routes: {
		home: "/",
		dashboard: "/dashboard",
		icon: "/icon",
		appleIcon: "/apple-icon",
		manifest: "/manifest.webmanifest",
		opengraphImage: "/opengraph-image",
		sitemap: "/sitemap.xml",
	},
	ogImage: {
		title: siteName,
		eyebrow: "Reusable Next.js foundation",
		description:
			"Shared UI, strict types, authentication scaffolding, and sensible SEO defaults.",
		alt: "Starter App social preview image",
		width: 1200,
		height: 630,
	},
} as const;
