import { TextInput, type TextStyle } from "react-native";

declare module "react-native" {
	interface TextInputProps {
		className?: string;
	}
}

type InputProps = {
	value?: string;
	placeholder?: string;
	secureTextEntry?: boolean;
	disabled?: boolean;
	className?: string;
	style?: TextStyle;
	onChangeText?: (text: string) => void;
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
	const base =
		"border border-neutral-300 rounded-md px-3 py-2 text-sm bg-white";
	const classes = [base, disabled ? "opacity-50" : "", className]
		.filter(Boolean)
		.join(" ");

	return (
		<TextInput
			value={value}
			placeholder={placeholder}
			placeholderTextColor="#a3a3a3"
			secureTextEntry={secureTextEntry}
			editable={!disabled}
			className={classes}
			style={style}
			onChangeText={onChangeText}
		/>
	);
}
