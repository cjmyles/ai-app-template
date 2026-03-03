import { Text as RNText, type TextStyle } from "react-native";

type TextProps = {
	children?: string;
	style?: TextStyle;
};

export function Text({ children, style }: TextProps) {
	return <RNText style={style}>{children}</RNText>;
}
