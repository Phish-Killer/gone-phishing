// Sign-in: a username is an account. Validates, finds-or-creates the user,
// and starts the (unsigned — see packages/auth) session. No password: this
// route does identity, not authentication, and refuses to run in production
// builds for exactly that reason.
// Development-only login using a username.
// This is not secure authentication because no password is required.

import { SignIn, findOrCreateUser } from "@project/domain";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Disable passwordless login in production by default.
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_DEV_IDENTITY) {
    return Response.json(
      {
        error: {
          code: "AUTH_DISABLED",
          message: "Passwordless sign-in is disabled in production.",
        },
      },
      { status: 403 }
    );
  }

  // Read the JSON data sent by the frontend.
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    // Return an error if the request body is not valid JSON.
    return Response.json(
      {
        error: {
          code: "BAD_JSON",
          message: "Body must be valid JSON",
        },
      },
      { status: 400 }
    );
  }

  // Validate the username using the shared Zod schema.
  const parsed = SignIn.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        error: {
          code: "INVALID_INPUT",
          message: "Username is required",
        },
      },
      { status: 400 }
    );
  }

  const username = parsed.data.username;

  // Find the existing user or create a new one in the database.
  const user = await findOrCreateUser(username);

  // Store the user ID in a cookie for future requests.
  // This unsigned cookie is only suitable for development.
  const cookieStore = await cookies();
  cookieStore.set("user-id", user.id);

  // Send the user's information back to the frontend.
  return Response.json({
    user: {
      id: user.id,
      username: user.userName,
    },
  });
}