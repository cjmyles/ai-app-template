import type { ReactNode } from "react";
import { View } from "react-native";
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
		"rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<View className={classes}>
			<View className="gap-2">
				<Text className="text-center text-sm font-semibold text-neutral-900">
					{title}
				</Text>
				{description ? (
					<Text className="text-center text-sm leading-6 text-neutral-600">
						{description}
					</Text>
				) : null}
				{children}
			</View>
		</View>
	);
}
