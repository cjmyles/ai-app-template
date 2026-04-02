import type { ReactNode } from "react";

export type EmptyStateProps = {
	title: string;
	description?: string;
	className?: string;
	children?: ReactNode;
};

export function EmptyState({
	title,
	description,
	className,
	children,
}: EmptyStateProps) {
	const classes = [
		"rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<section className={classes}>
			<div className="space-y-2">
				<h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
				{description ? (
					<p className="text-sm leading-6 text-neutral-600">{description}</p>
				) : null}
				{children}
			</div>
		</section>
	);
}
