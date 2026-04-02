import type { ReactNode } from "react";

type NoticeTone = "info" | "success" | "warning" | "danger";

const TONE_CLASSES: Record<NoticeTone, string> = {
	info: "border-blue-200 bg-blue-50 text-blue-950",
	success: "border-green-200 bg-green-50 text-green-950",
	warning: "border-amber-200 bg-amber-50 text-amber-950",
	danger: "border-red-200 bg-red-50 text-red-950",
};

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
		TONE_CLASSES[tone],
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<section className={classes}>
			<div className="space-y-2">
				<h2 className="text-sm font-semibold">{title}</h2>
				{description ? (
					<p className="text-sm leading-6 text-current/80">{description}</p>
				) : null}
				{children}
			</div>
		</section>
	);
}
