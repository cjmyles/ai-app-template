import type { HealthResponse } from "@repo/types";
import { HealthResponseSchema } from "@repo/types";
import { EmptyState, NoticeCard, Text } from "@repo/ui";
import { useEffect, useState } from "react";
import { View } from "react-native";

// Set EXPO_PUBLIC_API_URL in the repo root .env for local development.
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
		<View className="flex-1 items-center justify-center bg-white px-6">
			<View className="w-full max-w-md gap-4">
				<Text className="text-center text-2xl font-semibold text-neutral-900">
					Native health check
				</Text>
				{error !== null ? (
					<NoticeCard
						tone="danger"
						title="API request failed"
						description={error}
					/>
				) : data !== null ? (
					<NoticeCard
						tone="success"
						title="API reachable"
						description={`ok: ${String(data.ok)}`}
					/>
				) : (
					<EmptyState
						title="Checking the web API"
						description="The native app is calling /api/health using EXPO_PUBLIC_API_URL from the repo root .env."
					/>
				)}
			</View>
		</View>
	);
}
