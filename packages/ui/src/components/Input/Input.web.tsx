import type { ChangeEvent } from "react";

type InputProps = {
	value?: string;
	placeholder?: string;
	type?: string;
	disabled?: boolean;
	className?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
	value,
	placeholder,
	type = "text",
	disabled = false,
	className,
	onChange,
}: InputProps) {
	const base =
		"flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50";
	const classes = [base, className].filter(Boolean).join(" ");

	return (
		<input
			type={type}
			value={value}
			placeholder={placeholder}
			disabled={disabled}
			className={classes}
			onChange={onChange}
		/>
	);
}
