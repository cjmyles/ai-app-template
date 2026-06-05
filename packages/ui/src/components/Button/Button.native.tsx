import {
	Pressable,
	type PressableProps,
	Text,
	type ViewStyle,
} from "react-native";
import { buttonColorClassTokens } from "../../tokens/color-classes";

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
	const tone = buttonColorClassTokens[variant];
	const containerClass = [
		"rounded-md items-center justify-center",
		tone.container,
		SIZE_CONTAINER[size],
		disabled ? "opacity-50" : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	const textClass = [tone.text, "font-medium", SIZE_TEXT[size]].join(" ");

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
