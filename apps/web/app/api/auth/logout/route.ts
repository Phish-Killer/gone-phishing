// Sign-out: clear the session cookie. That's all a session is here.

import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("user-id");
  return Response.json({ ok: true });
}