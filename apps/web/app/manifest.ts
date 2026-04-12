import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
	return {
		id: siteConfig.routes.home,
		name: siteConfig.name,
		short_name: siteConfig.shortName,
		description: siteConfig.description,
		start_url: siteConfig.routes.home,
		display: "standalone",
		background_color: siteConfig.backgroundColor,
		theme_color: siteConfig.themeColor,
		icons: [
			{
				src: siteConfig.routes.icon,
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: siteConfig.routes.appleIcon,
				sizes: "180x180",
				type: "image/png",
			},
		],
	};
}
