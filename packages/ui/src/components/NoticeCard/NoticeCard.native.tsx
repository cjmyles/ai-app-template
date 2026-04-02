import type { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "../Text/Text.native";

declare module "react-native" {
	interface ViewProps {
		className?: string;
	}
}

type NoticeTone = "info" | "success" | "warning" | "danger";

const TONE_CLASSES: Record<NoticeTone, string> = {
	info: "border border-blue-200 bg-blue-50",
	success: "border border-green-200 bg-green-50",
	warning: "border border-amber-200 bg-amber-50",
	danger: "border border-red-200 bg-red-50",
};

export type NoticeCardProps = {
	title: string;
	description?: string;
	tone?: NoticeTone;
	className?: string;
	children?: ReactNode;
};

export function NoticeCard({
	title,
	description,
	tone = "info",
	className,
	children,
}: NoticeCardProps) {
	const classes = ["rounded-xl p-4", TONE_CLASSES[tone], className]
		.filter(Boolean)
		.join(" ");

	return (
		<View className={classes}>
			<View className="gap-2">
				<Text className="text-sm font-semibold text-neutral-950">{title}</Text>
				{description ? (
					<Text className="text-sm leading-6 text-neutral-700">
						{description}
					</Text>
				) : null}
				{children}
			</View>
		</View>
	);
}
