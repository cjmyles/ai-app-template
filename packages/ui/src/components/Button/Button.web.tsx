import type { ReactNode } from "react";
import {
	buttonColorClassTokens,
	colorClassTokens,
} from "../../tokens/color-classes";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

const SIZE: Record<Size, string> = {
	sm: "px-3 py-1 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-6 py-3 text-lg",
};

type ButtonProps = {
	children?: ReactNode;
	variant?: Variant;
	size?: Size;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	className?: string;
	onClick?: () => void;
};

export function Button({
	children,
	variant = "primary",
	size = "md",
	disabled = false,
	type = "button",
	className,
	onClick,
}: ButtonProps) {
	const tone = buttonColorClassTokens[variant];
	const base =
		"inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
	const classes = [
		base,
		tone.container,
		tone.hover,
		tone.text,
		colorClassTokens.ring.focus,
		SIZE[size],
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			type={type}
			className={classes}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
