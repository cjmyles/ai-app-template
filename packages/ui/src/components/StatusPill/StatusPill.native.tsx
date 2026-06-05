import { Text, View, type ViewStyle } from "react-native";
import { badgeColorClassTokens } from "../../tokens/color-classes";
import { cx, type FeedbackTone } from "../../variants";

declare module "react-native" {
	interface TextProps {
		className?: string;
	}
	interface ViewProps {
		className?: string;
	}
}

type StatusTone = FeedbackTone | "neutral";

const TONE: Record<StatusTone, keyof typeof badgeColorClassTokens> = {
	info: "default",
	success: "success",
	warning: "outline",
	danger: "destructive",
	neutral: "secondary",
};

type StatusPillProps = {
	children: string;
	tone?: StatusTone;
	className?: string;
	style?: ViewStyle;
};

export function StatusPill({
	children,
	tone = "neutral",
	className,
	style,
}: StatusPillProps) {
	const token = badgeColorClassTokens[TONE[tone]];

	return (
		<View
			className={cx(
				"rounded-full px-2.5 py-0.5 items-center justify-center",
				token.container,
				className,
			)}
			style={style}
		>
			<Text className={cx("text-xs font-medium", token.text)}>{children}</Text>
		</View>
	);
}
