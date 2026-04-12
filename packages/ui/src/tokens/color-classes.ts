const background = {
	canvas: "bg-white",
	subtle: "bg-neutral-50",
	muted: "bg-neutral-100",
	emphasis: "bg-neutral-200",
	transparent: "bg-transparent",
	primarySolid: "bg-blue-600",
	primaryHover: "hover:bg-blue-700",
	destructiveSolid: "bg-red-600",
	destructiveHover: "hover:bg-red-700",
	infoSoft: "bg-blue-50",
	successSoft: "bg-green-50",
	successMuted: "bg-green-100",
	warningSoft: "bg-amber-50",
	destructiveSoft: "bg-red-50",
	destructiveMuted: "bg-red-100",
} as const;

const border = {
	default: "border-neutral-300",
	infoSoft: "border-blue-200",
	successSoft: "border-green-200",
	warningSoft: "border-amber-200",
	destructiveSoft: "border-red-200",
} as const;

const text = {
	strong: "text-neutral-950",
	primary: "text-neutral-900",
	secondary: "text-neutral-700",
	muted: "text-neutral-600",
	subtle: "text-neutral-400",
	placeholder: "placeholder:text-neutral-400",
	inverse: "text-white",
	success: "text-green-800",
	destructive: "text-red-800",
} as const;

const ring = {
	focus: "focus-visible:ring-blue-500",
} as const;

export const colorClassTokens = {
	background,
	border,
	text,
	ring,
} as const;

export const buttonColorClassTokens = {
	primary: {
		container: background.primarySolid,
		hover: background.primaryHover,
		text: text.inverse,
	},
	secondary: {
		container: background.muted,
		hover: "hover:bg-neutral-200",
		text: text.primary,
	},
	ghost: {
		container: background.transparent,
		hover: "hover:bg-neutral-100",
		text: text.primary,
	},
	destructive: {
		container: background.destructiveSolid,
		hover: background.destructiveHover,
		text: text.inverse,
	},
} as const;

export const badgeColorClassTokens = {
	default: {
		container: background.primarySolid,
		text: text.inverse,
	},
	secondary: {
		container: background.muted,
		text: text.primary,
	},
	success: {
		container: background.successMuted,
		text: text.success,
	},
	destructive: {
		container: background.destructiveMuted,
		text: text.destructive,
	},
	outline: {
		container: `border ${border.default}`,
		text: text.primary,
	},
} as const;

export const noticeColorClassTokens = {
	info: `border ${border.infoSoft} ${background.infoSoft}`,
	success: `border ${border.successSoft} ${background.successSoft}`,
	warning: `border ${border.warningSoft} ${background.warningSoft}`,
	danger: `border ${border.destructiveSoft} ${background.destructiveSoft}`,
} as const;
