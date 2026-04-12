import type { Metadata, Viewport } from "next";
import { siteConfig } from "./config";

export type RouteIndexing = "public" | "private";

type PageMetadataOptions = {
	title?: string;
	description?: string;
	path?: string;
	indexing?: RouteIndexing;
	keywords?: string[];
};

const routeRobots: Record<RouteIndexing, NonNullable<Metadata["robots"]>> = {
	public: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	private: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: {
			index: false,
			follow: false,
			noimageindex: true,
			"max-image-preview": "none",
			"max-snippet": 0,
			"max-video-preview": 0,
		},
	},
};

function normalizePath(path: string) {
	if (path === "/") return path;
	const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
	return withLeadingSlash.endsWith("/")
		? withLeadingSlash.slice(0, -1)
		: withLeadingSlash;
}

function resolveTitle(title?: string) {
	return title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle;
}

export function getRobots(indexing: RouteIndexing = "public") {
	return routeRobots[indexing];
}

export function getCanonicalUrl(path: string) {
	if (!siteConfig.hasConfiguredSiteUrl) return undefined;
	return new URL(normalizePath(path), siteConfig.metadataBase).toString();
}

export function getAbsoluteUrl(path: string) {
	return new URL(normalizePath(path), siteConfig.metadataBase).toString();
}

export function buildPageMetadata({
	title,
	description = siteConfig.description,
	path = siteConfig.routes.home,
	indexing = "public",
	keywords = [],
}: PageMetadataOptions = {}): Metadata {
	const canonicalUrl =
		indexing === "public" ? getCanonicalUrl(path) : undefined;
	const allKeywords = Array.from(
		new Set([...siteConfig.keywords, ...keywords]),
	);

	return {
		title,
		description,
		keywords: allKeywords,
		alternates: canonicalUrl
			? {
					canonical: canonicalUrl,
				}
			: undefined,
		robots: getRobots(indexing),
		openGraph: {
			type: "website",
			locale: siteConfig.locale,
			siteName: siteConfig.name,
			title: resolveTitle(title),
			description,
			url: canonicalUrl,
			images: [
				{
					url: siteConfig.routes.opengraphImage,
					width: siteConfig.ogImage.width,
					height: siteConfig.ogImage.height,
					alt: siteConfig.ogImage.alt,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: resolveTitle(title),
			description,
			images: [siteConfig.routes.opengraphImage],
		},
	};
}

export function buildSiteMetadata(): Metadata {
	const pageMetadata = buildPageMetadata();

	return {
		metadataBase: siteConfig.metadataBase,
		applicationName: siteConfig.applicationName,
		title: {
			default: siteConfig.defaultTitle,
			template: siteConfig.titleTemplate,
		},
		description: siteConfig.description,
		keywords: [...siteConfig.keywords],
		robots: getRobots("public"),
		manifest: siteConfig.routes.manifest,
		icons: {
			icon: [
				{ url: siteConfig.routes.icon, type: "image/png", sizes: "512x512" },
			],
			apple: [
				{
					url: siteConfig.routes.appleIcon,
					type: "image/png",
					sizes: "180x180",
				},
			],
			shortcut: [siteConfig.routes.icon],
		},
		appleWebApp: {
			capable: true,
			statusBarStyle: "default",
			title: siteConfig.shortName,
		},
		formatDetection: {
			address: false,
			email: false,
			telephone: false,
		},
		category: "technology",
		openGraph: pageMetadata.openGraph,
		twitter: pageMetadata.twitter,
	};
}

export function buildViewport(): Viewport {
	return {
		colorScheme: "light",
		themeColor: siteConfig.themeColor,
	};
}
