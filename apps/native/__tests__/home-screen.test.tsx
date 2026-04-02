import { render, screen, waitFor } from "@testing-library/react-native";

jest.mock("react-native-css-interop/jsx-runtime", () =>
	require("react/jsx-runtime"),
);

jest.mock("@repo/ui", () => {
	const { Text, View } = require("react-native");

	return {
		Text,
		NoticeCard: ({
			title,
			description,
		}: {
			title: string;
			description: string;
		}) => (
			<View>
				<Text>{title}</Text>
				<Text>{description}</Text>
			</View>
		),
		EmptyState: ({
			title,
			description,
		}: {
			title: string;
			description: string;
		}) => (
			<View>
				<Text>{title}</Text>
				<Text>{description}</Text>
			</View>
		),
	};
});

import HomeScreen from "../app/index";

describe("HomeScreen", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("renders the successful health response", async () => {
		jest.spyOn(global, "fetch").mockResolvedValue({
			json: async () => ({ ok: true }),
		} as Response);

		render(<HomeScreen />);

		await waitFor(() => {
			expect(screen.getByText("API reachable")).toBeOnTheScreen();
			expect(screen.getByText("ok: true")).toBeOnTheScreen();
		});
	});
});
