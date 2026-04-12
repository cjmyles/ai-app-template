import type { ReactNode } from "react";
import { View } from "react-native";
import { colorClassTokens } from "../../tokens/colorClasses";
import { Text } from "../Text/Text.native";

declare module "react-native" {
	interface ViewProps {
		className?: string;
	}
}

export type EmptyStateProps = {
	title: string;
	description?: string;
	className?: string;
	children?: ReactNode;
};

export function EmptyState({
	title,
	description,
	className,
	children,
}: EmptyStateProps) {
	const classes = [
		"rounded-xl border border-dashed p-6",
		colorClassTokens.border.default,
		colorClassTokens.background.subtle,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<View className={classes}>
			<View className="gap-2">
				<Text
					className={[
						"text-center text-sm font-semibold",
						colorClassTokens.text.primary,
					].join(" ")}
				>
					{title}
				</Text>
				{description ? (
					<Text
						className={[
							"text-center text-sm leading-6",
							colorClassTokens.text.muted,
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
