import { Text, View, type ViewStyle } from "react-native";

declare module "react-native" {
	interface TextProps {
		className?: string;
	}
	interface ViewProps {
		className?: string;
	}
}

type Variant = "default" | "secondary" | "success" | "destructive" | "outline";

const VARIANT_CONTAINER: Record<Variant, string> = {
	default: "bg-blue-600 rounded-full px-2.5 py-0.5 items-center justify-center",
	secondary:
		"bg-neutral-100 rounded-full px-2.5 py-0.5 items-center justify-center",
	success:
		"bg-green-100 rounded-full px-2.5 py-0.5 items-center justify-center",
	destructive:
		"bg-red-100 rounded-full px-2.5 py-0.5 items-center justify-center",
	outline:
		"border border-neutral-300 rounded-full px-2.5 py-0.5 items-center justify-center",
};

const VARIANT_TEXT: Record<Variant, string> = {
	default: "text-white text-xs font-medium",
	secondary: "text-neutral-900 text-xs font-medium",
	success: "text-green-800 text-xs font-medium",
	destructive: "text-red-800 text-xs font-medium",
	outline: "text-neutral-900 text-xs font-medium",
};

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
	const containerClass = [VARIANT_CONTAINER[variant], className]
		.filter(Boolean)
		.join(" ");

	return (
		<View className={containerClass} style={style}>
			<Text className={VARIANT_TEXT[variant]}>{children}</Text>
		</View>
	);
}
