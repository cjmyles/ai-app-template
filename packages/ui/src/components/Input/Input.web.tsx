import type { ComponentPropsWithoutRef } from "react";
import { colorClassTokens } from "../../tokens/colorClasses";

type InputProps = ComponentPropsWithoutRef<"input">;

export function Input({ className, type = "text", ...props }: InputProps) {
	const base = [
		"flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
		colorClassTokens.border.default,
		colorClassTokens.background.canvas,
		colorClassTokens.text.placeholder,
		colorClassTokens.ring.focus,
	]
		.filter(Boolean)
		.join(" ");
	const classes = [base, className].filter(Boolean).join(" ");

	return <input type={type} className={classes} {...props} />;
}
