import {
	Image,
	type ImageStyle,
	Text,
	View,
	type ViewStyle,
} from "react-native";
import { colorClassTokens } from "../../tokens/colorClasses";

declare module "react-native" {
	interface TextProps {
		className?: string;
	}
	interface ViewProps {
		className?: string;
	}
	interface ImagePropsBase {
		className?: string;
	}
}

type Size = "sm" | "md" | "lg";

const SIZE_CONTAINER: Record<Size, string> = {
	sm: "h-8 w-8",
	md: "h-10 w-10",
	lg: "h-14 w-14",
};

const SIZE_TEXT: Record<Size, string> = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-base",
};

const SIZE_PX: Record<Size, number> = {
	sm: 32,
	md: 40,
	lg: 56,
};

type AvatarProps = {
	src?: string;
	alt?: string;
	initials?: string;
	size?: Size;
	className?: string;
	style?: ViewStyle;
};

export function Avatar({
	src,
	alt = "",
	initials,
	size = "md",
	className,
	style,
}: AvatarProps) {
	const px = SIZE_PX[size];
	const containerClass = [
		"items-center justify-center overflow-hidden rounded-full",
		colorClassTokens.background.emphasis,
		SIZE_CONTAINER[size],
		className,
	]
		.filter(Boolean)
		.join(" ");

	if (src) {
		return (
			<View className={containerClass} style={style}>
				<Image
					source={{ uri: src }}
					accessibilityLabel={alt}
					style={{ width: px, height: px } as ImageStyle}
				/>
			</View>
		);
	}

	const label = initials ?? alt.charAt(0).toUpperCase();

	return (
		<View className={containerClass} style={style}>
			<Text
				className={[
					SIZE_TEXT[size],
					colorClassTokens.text.secondary,
					"font-medium",
				].join(" ")}
			>
				{label}
			</Text>
		</View>
	);
}
