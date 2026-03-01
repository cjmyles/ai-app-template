import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "AI App Template",
	description: "AI App Template monorepo",
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
