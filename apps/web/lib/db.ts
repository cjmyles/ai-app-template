import { PrismaClient } from "@prisma/client";

// Typed extension of globalThis preserves the singleton across HMR in development.
const g = globalThis as typeof globalThis & { __prisma?: PrismaClient };

export const db = g.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") g.__prisma = db;
