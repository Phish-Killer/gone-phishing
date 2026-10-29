// Sign-out: clear the session cookie. That's all a session is here.
// Development-only logout.
// Clears the user ID cookie created during login.

import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST() {
  // Get the cookie store for the current request.
  const cookieStore = await cookies();

  // Delete the user ID cookie to end the dev login session.
  cookieStore.delete("user-id");

  // Tell the frontend that the logout request succeeded.
  return Response.json({ ok: true });
}