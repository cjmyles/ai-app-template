import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

export const metadata: Metadata = {
	title: "AI App Template",
	description: "AI App Template monorepo",
	...(metadataBase
		? {
				metadataBase,
				alternates: {
					canonical: "/",
				},
			}
		: {}),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
