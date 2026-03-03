import type { ReactNode } from "react";

type Variant = "default" | "secondary" | "success" | "destructive" | "outline";

const VARIANT: Record<Variant, string> = {
	default: "bg-blue-600 text-white",
	secondary: "bg-neutral-100 text-neutral-900",
	success: "bg-green-100 text-green-800",
	destructive: "bg-red-100 text-red-800",
	outline: "border border-neutral-300 text-neutral-900",
};

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
	const base =
		"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
	const classes = [base, VARIANT[variant], className].filter(Boolean).join(" ");

	return <span className={classes}>{children}</span>;
}
