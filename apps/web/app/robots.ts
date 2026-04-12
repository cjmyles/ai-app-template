import type { MetadataRoute } from "next";
import { getAbsoluteUrl, siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
	if (!siteConfig.hasConfiguredSiteUrl) {
		return {
			rules: {
				userAgent: "*",
				disallow: "/",
			},
		};
	}

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/dashboard/"],
			},
		],
		sitemap: getAbsoluteUrl(siteConfig.routes.sitemap),
		host: siteConfig.siteUrl ?? undefined,
	};
}
