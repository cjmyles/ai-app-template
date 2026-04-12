import { siteConfig } from "./config";
import { getAbsoluteUrl, getCanonicalUrl } from "./metadata";

type JsonLd = Record<string, unknown>;

export function buildWebsiteStructuredData(
	path = siteConfig.routes.home,
): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.name,
		description: siteConfig.description,
		inLanguage: siteConfig.language,
		url: getCanonicalUrl(path),
		image: siteConfig.hasConfiguredSiteUrl
			? getAbsoluteUrl(siteConfig.routes.opengraphImage)
			: undefined,
	};
}
