export function cx(
	...classes: Array<false | null | string | undefined>
): string {
	return classes.filter(Boolean).join(" ");
}

export type FeedbackTone = "info" | "success" | "warning" | "danger";
export type Size = "sm" | "md" | "lg";
