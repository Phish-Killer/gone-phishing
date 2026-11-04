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
      // Call the existing logout API to clear the user cookie.
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      // Check whether the logout request succeeded.
      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Redirect to the login page and refresh the user state.
      router.push("/login");
      router.refresh();
    } catch {
      // Show an error message if logout fails.
      setError("Unable to log out. Please try again.");
    } finally {
      // Reset the loading state after the request finishes.
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
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
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