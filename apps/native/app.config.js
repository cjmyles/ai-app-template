const variant = process.env.APP_VARIANT ?? "development";

const variants = {
	development: {
		name: "Template Dev",
		slug: "template-dev",
		scheme: "template-dev",
		iosBundleIdentifier: "com.example.template.dev",
		androidPackage: "com.example.template.dev",
	},
	preview: {
		name: "Template Preview",
		slug: "template-preview",
		scheme: "template-preview",
		iosBundleIdentifier: "com.example.template.preview",
		androidPackage: "com.example.template.preview",
	},
	production: {
		name: "Template",
		slug: "template",
		scheme: "template",
		iosBundleIdentifier: "com.example.template",
		androidPackage: "com.example.template",
	},
};

const selectedVariant = variants[variant] ?? variants.development;

module.exports = {
	expo: {
		name: selectedVariant.name,
		slug: selectedVariant.slug,
		version: "1.0.0",
		scheme: selectedVariant.scheme,
		platforms: ["ios", "android", "web"],
		newArchEnabled: true,
		ios: {
			bundleIdentifier: selectedVariant.iosBundleIdentifier,
			associatedDomains: ["applinks:example.com"],
		},
		android: {
			package: selectedVariant.androidPackage,
			intentFilters: [
				{
					action: "VIEW",
					autoVerify: true,
					data: [{ scheme: "https", host: "example.com" }],
					category: ["BROWSABLE", "DEFAULT"],
				},
			],
		},
		experiments: {
			typedRoutes: true,
		},
		extra: {
			appVariant: variant,
			apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000",
		},
		plugins: [
			"expo-router",
			[
				"expo-dev-client",
				{
					launchMode: "most-recent",
					addGeneratedScheme: true,
				},
			],
		],
	},
};
