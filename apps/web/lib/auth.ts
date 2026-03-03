import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { db } from "./db";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const email = credentials.email;
				if (typeof email !== "string") return null;
				const user = await db.user.findUnique({ where: { email } });
				if (!user) return null;
				// TODO: add password hashing (e.g. bcrypt) before production use
				return { id: user.id, email: user.email };
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user?.id) token.id = user.id;
			return token;
		},
		session({ session, token }) {
			if (typeof token.id === "string") session.user.id = token.id;
			return session;
		},
	},
});
