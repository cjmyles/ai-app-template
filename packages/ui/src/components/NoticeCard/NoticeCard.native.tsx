import type { ReactNode } from "react";
import { View } from "react-native";
import {
	colorClassTokens,
	noticeColorClassTokens,
} from "../../tokens/colorClasses";
import { Text } from "../Text/Text.native";

declare module "react-native" {
	interface ViewProps {
		className?: string;
	}
}

type NoticeTone = "info" | "success" | "warning" | "danger";

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
	const classes = ["rounded-xl p-4", noticeColorClassTokens[tone], className]
		.filter(Boolean)
		.join(" ");

	return (
		<View className={classes}>
			<View className="gap-2">
				<Text
					className={[
						"text-sm font-semibold",
						colorClassTokens.text.strong,
					].join(" ")}
				>
					{title}
				</Text>
				{description ? (
					<Text
						className={[
							"text-sm leading-6",
							colorClassTokens.text.secondary,
						].join(" ")}
					>
						{description}
					</Text>
				) : null}
				{children}
			</View>
		</View>
	);
}
