import { Text as RNText, type TextStyle } from "react-native";

// Extend React Native's TextProps to accept className so NativeWind's
// Metro transform can process it at build time.
declare module "react-native" {
	interface TextProps {
		className?: string;
	}
}

type TextProps = {
	children?: string;
	className?: string;
	style?: TextStyle;
};

export function Text({ children, className, style }: TextProps) {
	return (
		<RNText className={className} style={style}>
			{children}
		</RNText>
	);
}
