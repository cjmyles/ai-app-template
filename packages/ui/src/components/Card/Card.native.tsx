import type { ReactNode } from "react";
import { View, type ViewStyle } from "react-native";
import { colorClassTokens } from "../../tokens/color-classes";
import { cx } from "../../variants";

declare module "react-native" {
	interface ViewProps {
		className?: string;
	}
}

type CardProps = {
	children?: ReactNode;
	className?: string;
	style?: ViewStyle;
};

export function Card({ children, className, style }: CardProps) {
	return (
		<View
			className={cx(
				"rounded-lg border p-5 shadow-sm",
				colorClassTokens.border.default,
				colorClassTokens.background.canvas,
				className,
			)}
			style={style}
		>
			{children}
		</View>
	);
}
