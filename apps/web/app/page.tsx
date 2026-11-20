import Link from "next/link";
import { auth } from "@project/auth";
import LogoutButton from "../components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Gone Phishing</h1>

        {session?.user ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-neutral-600">
              Signed in as {session.user.name ?? session.user.email}
            </p>

            <LogoutButton />
          </div>
        ) : (
          <div className="mt-4">
            <p className="mb-2">You are not signed in.</p>
            <Link href="/login" className="text-blue-600 underline">
              Go to Login
            </Link>
          </div>
        )}
      </header>

      <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
        <p className="mb-4 text-neutral-600">
          Welcome to Gone Phishing!
        </p>

        <a
          href="/api/health"
          className="text-blue-600 underline"
        >
          Check health &rarr;
        </a>
      </section>
    </main>
  );
}