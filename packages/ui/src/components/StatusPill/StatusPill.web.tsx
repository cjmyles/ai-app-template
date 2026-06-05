import type { ReactNode } from "react";
import { badgeColorClassTokens } from "../../tokens/color-classes";
import { cx, type FeedbackTone } from "../../variants";

type StatusTone = FeedbackTone | "neutral";

const TONE: Record<StatusTone, keyof typeof badgeColorClassTokens> = {
	info: "default",
	success: "success",
	warning: "outline",
	danger: "destructive",
	neutral: "secondary",
};

type StatusPillProps = {
	children?: ReactNode;
	tone?: StatusTone;
	className?: string;
};

export function StatusPill({
	children,
	tone = "neutral",
	className,
}: StatusPillProps) {
	const token = badgeColorClassTokens[TONE[tone]];

	return (
		<span
			className={cx(
				"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
				token.container,
				token.text,
				className,
			)}
		>
			{children}
		</span>
	);
}
