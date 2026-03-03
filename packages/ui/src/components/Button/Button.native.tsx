import {
	Pressable,
	type PressableProps,
	Text,
	type ViewStyle,
} from "react-native";

declare module "react-native" {
	interface TextProps {
		className?: string;
	}
	interface ViewProps {
		className?: string;
	}
}

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

const VARIANT_CONTAINER: Record<Variant, string> = {
	primary: "bg-blue-600 rounded-md items-center justify-center",
	secondary: "bg-neutral-100 rounded-md items-center justify-center",
	ghost: "bg-transparent rounded-md items-center justify-center",
	destructive: "bg-red-600 rounded-md items-center justify-center",
};

const VARIANT_TEXT: Record<Variant, string> = {
	primary: "text-white font-medium",
	secondary: "text-neutral-900 font-medium",
	ghost: "text-neutral-900 font-medium",
	destructive: "text-white font-medium",
};

const SIZE_CONTAINER: Record<Size, string> = {
	sm: "px-3 py-1",
	md: "px-4 py-2",
	lg: "px-6 py-3",
};

const SIZE_TEXT: Record<Size, string> = {
	sm: "text-sm",
	md: "text-base",
	lg: "text-lg",
};

type ButtonProps = {
	children?: string;
	variant?: Variant;
	size?: Size;
	disabled?: boolean;
	className?: string;
	style?: ViewStyle;
	onPress?: PressableProps["onPress"];
};

export function Button({
	children,
	variant = "primary",
	size = "md",
	disabled = false,
	className,
	style,
	onPress,
}: ButtonProps) {
	const containerClass = [
		VARIANT_CONTAINER[variant],
		SIZE_CONTAINER[size],
		disabled ? "opacity-50" : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	const textClass = [VARIANT_TEXT[variant], SIZE_TEXT[size]].join(" ");

	return (
		<Pressable
			className={containerClass}
			style={style}
			disabled={disabled}
			onPress={onPress}
		>
			<Text className={textClass}>{children}</Text>
		</Pressable>
	);
}
