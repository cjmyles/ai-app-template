import type { ReactNode } from "react";
import { badgeColorClassTokens } from "../../tokens/color-classes";

type Variant = "default" | "secondary" | "success" | "destructive" | "outline";

type BadgeProps = {
	children?: ReactNode;
	variant?: Variant;
	className?: string;
};

export function Badge({
	children,
	variant = "default",
	className,
}: BadgeProps) {
	const tone = badgeColorClassTokens[variant];
	const base =
		"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
	const classes = [base, tone.container, tone.text, className]
		.filter(Boolean)
		.join(" ");

	return <span className={classes}>{children}</span>;
}
