import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type HealthResponse = { ok: boolean };

export default function HomeScreen() {
	const [data, setData] = useState<HealthResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch("http://localhost:3000/api/health")
			.then((r) => r.json() as Promise<HealthResponse>)
			.then(setData)
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
