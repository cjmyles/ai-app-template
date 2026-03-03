import type { NextAuthConfig } from "next-auth";

// Edge-runtime-safe config — no Prisma imports.
// Used by middleware to verify JWT and protect routes.
export const authConfig = {
	pages: {
		signIn: "/",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			if (nextUrl.pathname.startsWith("/dashboard")) {
				return isLoggedIn;
			}
			return true;
		},
	},
	providers: [],
} satisfies NextAuthConfig;
