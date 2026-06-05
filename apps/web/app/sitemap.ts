import type { MetadataRoute } from "next";
import { getAbsoluteUrl, siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
	if (!siteConfig.hasConfiguredSiteUrl) {
		return [];
	}

	return [
		{
			url: getAbsoluteUrl(siteConfig.routes.home),
			changeFrequency: "weekly",
			priority: 1,
			lastModified: new Date(),
		},
	];
}
