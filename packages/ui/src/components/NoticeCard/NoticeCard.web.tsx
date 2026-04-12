import type { ReactNode } from "react";
import {
	colorClassTokens,
	noticeColorClassTokens,
} from "../../tokens/color-classes";

type NoticeTone = "info" | "success" | "warning" | "danger";

export type NoticeCardProps = {
	title: string;
	description?: string;
	tone?: NoticeTone;
	className?: string;
	children?: ReactNode;
};

export function NoticeCard({
	title,
	description,
	tone = "info",
	className,
	children,
}: NoticeCardProps) {
	const classes = [
		"rounded-xl border p-4 shadow-sm",
		noticeColorClassTokens[tone],
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
						colorClassTokens.text.strong,
					].join(" ")}
				>
					{title}
				</h2>
				{description ? (
					<p
						className={[
							"text-sm leading-6",
							colorClassTokens.text.secondary,
						].join(" ")}
					>
						{description}
					</p>
				) : null}
				{children}
			</div>
		</section>
	);
}
