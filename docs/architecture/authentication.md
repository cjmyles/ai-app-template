# Authentication

This template uses Auth.js with a minimal credentials scaffold for local
development.

## Failed Credentials

Ordinary credential failures should render a normal application error state.
They should not bubble into a Next.js error overlay.

For server actions, catch `AuthError` credential failures and redirect or render
an inline error state. Re-throw all other errors so real runtime bugs remain
visible.

## Protected Routes

Avoid login redirects that blindly send every signed-in user to a protected page.
A signed-in user can still be unauthorized for a specific protected route. If the
login page always redirects signed-in users to that route, and the route sends
unauthorized users back to login, the app can loop.

Use this pattern instead:

- Middleware or route guards protect each route based on its required access.
- Login success redirects to a safe default route or to a validated callback URL.
- Login pages only auto-redirect signed-in users when the destination is known to
  be allowed for that user.
- Unauthorized protected pages render a clear unauthorized state or redirect to a
  neutral page, not back to login.

## Local Auth URL

Keep `AUTH_URL` aligned with the actual web origin. The template runs Next on a
fixed `3000` port in `pnpm dev:web` so Auth.js callback URLs stay stable.

If you intentionally run the web app on another port, update `AUTH_URL` in the
root `.env` to match that exact origin.
