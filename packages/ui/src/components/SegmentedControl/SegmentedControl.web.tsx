import type { ReactNode } from "react";
import { colorClassTokens } from "../../tokens/color-classes";
import { cx } from "../../variants";

export type SegmentOption<TValue extends string> = {
	label: ReactNode;
	value: TValue;
	disabled?: boolean;
};

type SegmentedControlProps<TValue extends string> = {
	options: ReadonlyArray<SegmentOption<TValue>>;
	value: TValue;
	className?: string;
	onValueChange: (value: TValue) => void;
};

export function SegmentedControl<TValue extends string>({
	options,
	value,
	className,
	onValueChange,
}: SegmentedControlProps<TValue>) {
	return (
		<div
			className={cx(
				"inline-flex rounded-lg border p-1",
				colorClassTokens.border.default,
				colorClassTokens.background.muted,
				className,
			)}
			role="tablist"
		>
			{options.map((option) => {
				const selected = option.value === value;

				return (
					<button
						aria-selected={selected}
						className={cx(
							"rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
							selected
								? cx(
										colorClassTokens.background.canvas,
										colorClassTokens.text.strong,
										"shadow-sm",
									)
								: colorClassTokens.text.muted,
						)}
						disabled={option.disabled}
						key={option.value}
						role="tab"
						type="button"
						onClick={() => onValueChange(option.value)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
