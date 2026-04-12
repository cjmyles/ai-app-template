import { Text, View, type ViewStyle } from "react-native";
import { badgeColorClassTokens } from "../../tokens/color-classes";

declare module "react-native" {
	interface TextProps {
		className?: string;
	}
	interface ViewProps {
		className?: string;
	}
}

type Variant = "default" | "secondary" | "success" | "destructive" | "outline";

type BadgeProps = {
	children: string;
	variant?: Variant;
	className?: string;
	style?: ViewStyle;
};

export function Badge({
	children,
	variant = "default",
	className,
	style,
}: BadgeProps) {
	const tone = badgeColorClassTokens[variant];
	const containerClass = [
		"rounded-full px-2.5 py-0.5 items-center justify-center",
		tone.container,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<View className={containerClass} style={style}>
			<Text className={[tone.text, "text-xs font-medium"].join(" ")}>
				{children}
			</Text>
		</View>
	);
}
