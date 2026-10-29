// Boilerplate home page. Shows the current dev user and a link to the health
// check endpoint. Example branches replace this with their own app-specific UI.
// Starter homepage showing the current development user.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { currentUserId } from "@project/auth";
import LogoutButton from "../components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Redirect users without a login cookie to the login page.
  const cookieStore = await cookies();

  if (!cookieStore.get("user-id")?.value) {
    redirect("/login");
  }

  const userId = await currentUserId();

  // Keep the existing return (...) below.

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Starter Skeleton</h1>

        <p className="text-sm text-neutral-500">
          Signed in as{" "}
          <code className="rounded bg-neutral-100 px-1">{userId}</code>
          {" "} (dev identity stub — real auth arrives in Week 8)
        </p>

        {/* Show the logout button below the user information */}
        <LogoutButton />
      </header>

      <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
        <p className="mb-4 text-neutral-600">
          Welcome to the starter skeleton. The database is connected and ready.
          Example branches add their own pages, API routes, and background workers here.
        </p>

        <a
          href="/api/health"
          className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
        >
          Check health &rarr;
        </a>
      </section>
    </main>
  );
}
