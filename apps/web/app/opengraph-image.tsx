import { colors } from "@repo/ui";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const size = {
	width: siteConfig.ogImage.width,
	height: siteConfig.ogImage.height,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
	return new ImageResponse(
		<div
			style={{
				display: "flex",
				height: "100%",
				width: "100%",
				flexDirection: "column",
				justifyContent: "space-between",
				background: `linear-gradient(135deg, ${colors.neutral[900]} 0%, ${colors.primary[700]} 100%)`,
				padding: "64px",
				color: colors.white,
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "16px",
					fontSize: 28,
					fontWeight: 600,
					letterSpacing: "-0.04em",
					textTransform: "uppercase",
				}}
			>
				<div
					style={{
						height: 18,
						width: 18,
						borderRadius: 9999,
						background: colors.white,
						opacity: 0.9,
					}}
				/>
				{siteConfig.ogImage.eyebrow}
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
				<div
					style={{
						display: "flex",
						maxWidth: "78%",
						fontSize: 72,
						fontWeight: 700,
						lineHeight: 1.05,
						letterSpacing: "-0.06em",
					}}
				>
					{siteConfig.ogImage.title}
				</div>
				<div
					style={{
						display: "flex",
						maxWidth: "72%",
						fontSize: 32,
						lineHeight: 1.35,
						color: colors.whiteAlpha.strong,
					}}
				>
					{siteConfig.ogImage.description}
				</div>
			</div>
		</div>,
		size,
	);
}
