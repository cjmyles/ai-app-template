import type { HealthResponse } from "@repo/types";
import { HealthResponseSchema } from "@repo/types";
import { Text } from "@repo/ui";
import { useEffect, useState } from "react";
import { View } from "react-native";

// Set EXPO_PUBLIC_API_URL in apps/native/.env for physical devices / CI.
// Falls back to localhost for the iOS Simulator / Android Emulator.
const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export default function HomeScreen() {
	const [data, setData] = useState<HealthResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch(`${API_BASE}/api/health`)
			.then((r) => r.json())
			.then((json: unknown) => {
				const result = HealthResponseSchema.safeParse(json);
				if (!result.success) throw new Error("Invalid API response");
				setData(result.data);
			})
			.catch((e: unknown) => {
				setError(e instanceof Error ? e.message : "Unknown error");
			});
	}, []);

	return (
		<View className="flex-1 items-center justify-center bg-white">
			{error !== null ? (
				<Text className="text-red-500">{error}</Text>
			) : data !== null ? (
				<Text className="text-green-600">{`ok: ${String(data.ok)}`}</Text>
			) : (
				<Text className="text-gray-500">Fetching health…</Text>
			)}
		</View>
	);
}
