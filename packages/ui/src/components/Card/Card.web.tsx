import type { ReactNode } from "react";
import { colorClassTokens } from "../../tokens/color-classes";
import { cx } from "../../variants";

type CardProps = {
	children?: ReactNode;
	className?: string;
};

export function Card({ children, className }: CardProps) {
	return (
		<section
			className={cx(
				"rounded-lg border p-5 shadow-sm",
				colorClassTokens.border.default,
				colorClassTokens.background.canvas,
				className,
			)}
		>
			{children}
		</section>
	);
}
