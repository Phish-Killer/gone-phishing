// Dev identity stub: reads the user ID from a cookie, header, or env var.
// For development only. Replace with secure authentication before production.
// Development-only user identity helper.
// Reads the user ID from a cookie, header, or environment variable.
// This is not secure authentication and should be replaced before production.

import { cookies, headers } from "next/headers";

const FALLBACK = "demo-user";

export async function currentUserId(): Promise<string> {
  // Prevent the development identity system from running in production.
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_DEV_IDENTITY) {
    throw new Error(
      "Dev identity stub is disabled in production. (Week 8 replaces this with real auth.)"
    );
  }

  // Read the user ID cookie created by the login API.
  const cookieStore = await cookies();
  const cookieUserId = cookieStore.get("user-id")?.value;

  // Read the request headers as an alternative identity source.
  const h = await headers();

  // Prefer the cookie, then fall back to the header, env variable, or demo user.
  return cookieUserId ?? h.get("x-user-id") ?? process.env.DEV_USER_ID ?? FALLBACK;
}
