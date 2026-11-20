"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  // Track the loading state and any logout errors.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle the logout button click.
  async function handleLogout() {
  setLoading(true);
  setError("");
  try {
      const { signOut } = await import("next-auth/react");
      await signOut({ callbackUrl: "/login" });
    } catch {
      setError("Unable to log out. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      {/* Disable the button while the logout request is running */}
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="rounded-lg border border-black bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Signing out..." : "Sign out"}
      </button>

      {/* Display an error message if logout fails */}
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}