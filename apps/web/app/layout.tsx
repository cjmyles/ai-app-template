import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { buildSiteMetadata, buildViewport, siteConfig } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = buildSiteMetadata();
export const viewport: Viewport = buildViewport();

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang={siteConfig.language}>
			<body
				className={`${inter.className} min-h-screen bg-neutral-50 text-neutral-950 antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
