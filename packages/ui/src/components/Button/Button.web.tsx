import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
	primary: "bg-blue-600 text-white hover:bg-blue-700",
	secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
	ghost: "bg-transparent text-neutral-900 hover:bg-neutral-100",
	destructive: "bg-red-600 text-white hover:bg-red-700",
};

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
	const base =
		"inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50";
	const classes = [base, VARIANT[variant], SIZE[size], className]
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
