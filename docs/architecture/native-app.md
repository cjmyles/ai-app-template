# Native App

The Expo app uses variants so local development, preview builds, and production
builds can coexist on the same device.

## Variants

Set `APP_VARIANT` before running Expo:

- `development` - local development client or Expo Go.
- `preview` - internal preview builds.
- `production` - production app identity.

The default is `development`.

## Placeholders To Replace

Update these values when a project adopts the template:

- App display names.
- iOS bundle identifiers.
- Android package identifiers.
- URL schemes.
- Associated domains and app links.
- Public API URLs.

## Deep Links

Use neutral route paths and environment-specific domains. Keep universal link
and app link paths documented here once a product chooses them.

Avoid hard-coding product-specific paths into the template. Prefer environment
variables for hostnames and Expo config for schemes and identifiers.
