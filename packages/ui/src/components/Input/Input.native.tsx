import {
	type StyleProp,
	TextInput,
	type TextInputProps,
	type TextStyle,
} from "react-native";
import { colorClassTokens } from "../../tokens/colorClasses";
import { colors } from "../../tokens/colors";

declare module "react-native" {
	interface TextInputProps {
		className?: string;
	}
}

type InputProps = TextInputProps & {
	className?: string;
	disabled?: boolean;
	style?: StyleProp<TextStyle>;
};

export function Input({
	value,
	placeholder,
	secureTextEntry = false,
	disabled = false,
	className,
	style,
	onChangeText,
}: InputProps) {
	const base = [
		"rounded-md border px-3 py-2 text-sm",
		colorClassTokens.border.default,
		colorClassTokens.background.canvas,
	]
		.filter(Boolean)
		.join(" ");
	const classes = [base, disabled ? "opacity-50" : "", className]
		.filter(Boolean)
		.join(" ");

	return (
		<TextInput
			value={value}
			placeholder={placeholder}
			placeholderTextColor={colors.neutral[400]}
			secureTextEntry={secureTextEntry}
			editable={!disabled}
			className={classes}
			style={style}
			onChangeText={onChangeText}
		/>
	);
}
