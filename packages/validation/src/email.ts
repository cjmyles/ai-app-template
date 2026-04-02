const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmailAddress(value: string): string {
	return value.trim().toLowerCase();
}

export function isLikelyEmailAddress(value: string): boolean {
	return basicEmailPattern.test(normalizeEmailAddress(value));
}

export function resolveSeedEmail(
	rawValue: string | undefined,
	fallbackEmail: string,
): string {
	const nextEmail = normalizeEmailAddress(rawValue ?? fallbackEmail);

	if (!isLikelyEmailAddress(nextEmail)) {
		throw new Error(`Invalid seed email: ${nextEmail}`);
	}

	return nextEmail;
}
