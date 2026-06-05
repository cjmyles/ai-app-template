import type { ReactNode } from "react";
import { Pressable, Text, View, type ViewStyle } from "react-native";
import { colorClassTokens } from "../../tokens/color-classes";
import { cx } from "../../variants";

declare module "react-native" {
	interface TextProps {
		className?: string;
	}
	interface ViewProps {
		className?: string;
	}
}

export type SegmentOption<TValue extends string> = {
	label: ReactNode;
	value: TValue;
	disabled?: boolean;
};

type SegmentedControlProps<TValue extends string> = {
	options: ReadonlyArray<SegmentOption<TValue>>;
	value: TValue;
	className?: string;
	style?: ViewStyle;
	onValueChange: (value: TValue) => void;
};

export function SegmentedControl<TValue extends string>({
	options,
	value,
	className,
	style,
	onValueChange,
}: SegmentedControlProps<TValue>) {
	return (
		<View
			className={cx(
				"flex-row rounded-lg border p-1",
				colorClassTokens.border.default,
				colorClassTokens.background.muted,
				className,
			)}
			style={style}
		>
			{options.map((option) => {
				const selected = option.value === value;

				return (
					<Pressable
						accessibilityRole="button"
						accessibilityState={{ disabled: option.disabled, selected }}
						className={cx(
							"rounded-md px-3 py-1.5",
							selected
								? cx(colorClassTokens.background.canvas, "shadow-sm")
								: "",
							option.disabled ? "opacity-50" : "",
						)}
						disabled={option.disabled}
						key={option.value}
						onPress={() => onValueChange(option.value)}
					>
						<Text
							className={cx(
								"text-sm font-medium",
								selected
									? colorClassTokens.text.strong
									: colorClassTokens.text.muted,
							)}
						>
							{option.label}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
}
