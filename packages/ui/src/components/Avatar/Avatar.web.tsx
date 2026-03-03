type Size = "sm" | "md" | "lg";

const SIZE: Record<Size, string> = {
	sm: "h-8 w-8 text-xs",
	md: "h-10 w-10 text-sm",
	lg: "h-14 w-14 text-base",
};

type AvatarProps = {
	src?: string;
	alt?: string;
	initials?: string;
	size?: Size;
	className?: string;
};

export function Avatar({
	src,
	alt = "",
	initials,
	size = "md",
	className,
}: AvatarProps) {
	const base =
		"rounded-full overflow-hidden inline-flex items-center justify-center bg-neutral-200 text-neutral-700 font-medium select-none";
	const classes = [base, SIZE[size], className].filter(Boolean).join(" ");

	if (src) {
		return (
			<img
				src={src}
				alt={alt}
				className={["rounded-full object-cover", SIZE[size], className]
					.filter(Boolean)
					.join(" ")}
			/>
		);
	}

	return (
		<span className={classes}>{initials ?? alt.charAt(0).toUpperCase()}</span>
	);
}
