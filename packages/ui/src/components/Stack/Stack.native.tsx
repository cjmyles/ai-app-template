import type { ReactNode } from "react";
import { View, type ViewStyle } from "react-native";
import { cx } from "../../variants";

declare module "react-native" {
	interface ViewProps {
		className?: string;
	}
}

type Direction = "row" | "column";
type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

const DIRECTION: Record<Direction, string> = {
	row: "flex-row",
	column: "flex-col",
};

const GAP: Record<Gap, string> = {
	none: "gap-0",
	xs: "gap-1",
	sm: "gap-2",
	md: "gap-4",
	lg: "gap-6",
	xl: "gap-8",
};

type StackProps = {
	children?: ReactNode;
	direction?: Direction;
	gap?: Gap;
	className?: string;
	style?: ViewStyle;
};

export function Stack({
	children,
	direction = "column",
	gap = "md",
	className,
	style,
}: StackProps) {
	return (
		<View
			className={cx(DIRECTION[direction], GAP[gap], className)}
			style={style}
		>
			{children}
		</View>
	);
}
