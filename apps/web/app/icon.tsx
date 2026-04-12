import { colors } from "@repo/ui";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const size = {
	width: 512,
	height: 512,
};

export const contentType = "image/png";

const iconLabel = siteConfig.shortName.charAt(0).toUpperCase();

export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				display: "flex",
				height: "100%",
				width: "100%",
				alignItems: "center",
				justifyContent: "center",
				background: colors.primary[600],
			}}
		>
			<div
				style={{
					display: "flex",
					height: 264,
					width: 264,
					alignItems: "center",
					justifyContent: "center",
					borderRadius: 96,
					background: colors.white,
					color: colors.primary[700],
					fontSize: 164,
					fontWeight: 700,
					letterSpacing: "-0.08em",
				}}
			>
				{iconLabel}
			</div>
		</div>,
		size,
	);
}
