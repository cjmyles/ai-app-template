import type { ReactNode } from "react";
import { colorClassTokens } from "../../tokens/color-classes";

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
		"rounded-xl border border-dashed p-6 text-center",
		colorClassTokens.border.default,
		colorClassTokens.background.subtle,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<section className={classes}>
			<div className="space-y-2">
				<h2
					className={[
						"text-sm font-semibold",
						colorClassTokens.text.primary,
					].join(" ")}
				>
					{title}
				</h2>
				{description ? (
					<p
						className={["text-sm leading-6", colorClassTokens.text.muted].join(
							" ",
						)}
					>
						{description}
					</p>
				) : null}
				{children}
			</div>
		</section>
	);
}
