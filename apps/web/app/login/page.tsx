
"use client";

// React hooks for managing form state and Next.js navigation.
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Store the username, error message, and loading status.
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission when the user clicks Continue.
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Make sure the username is not empty.
    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    // Clear previous errors and show the loading state.
    setError("");
    setLoading(true);

    try {
      // Send the username to the existing login API.
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.trim() }),
      });

      // Show an error if the login request fails.
      if (!response.ok) {
        throw new Error("Unable to sign in. Please try again.");
      }

      // Redirect to the homepage and refresh the user information.
      router.push("/");
      router.refresh();
    } catch {
      // Display an error message if the request fails.
      setError("Unable to sign in. Please try again.");
    } finally {
      // Stop the loading state whether login succeeds or fails.
      setLoading(false);
    }
  }

  return (
    // Center the login form on the page.
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Gone Phishing
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Welcome back
        </p>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Username
            </label>

            {/* Controlled input linked to React state */}
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your username"
            />
          </div>

          {/* Show an error message when login fails */}
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Disable the button while the request is running */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}