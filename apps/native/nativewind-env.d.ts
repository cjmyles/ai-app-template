/// <reference types="nativewind/types" />

// Expo injects process.env at build time via Metro. Declare the shape so
// TypeScript recognises EXPO_PUBLIC_* variables without requiring @types/node.
declare const process: { env: Record<string, string | undefined> };
