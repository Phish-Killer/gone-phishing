"use client";

import { useState } from "react";

export default function CheckEmail() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ text: React.ReactNode; error?: boolean } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setResult({ text: json.error?.message ?? "Something went wrong.", error: true });
        return;
      }
      setResult({
        text: (
          <>
            <strong>{json.domain}</strong> is {json.inDatabase ? "in" : "not in"} the database.
          </>
        ),
      });
    } catch {
      setResult({ text: "Could not reach the server.", error: true });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label htmlFor="email" className="block text-sm font-medium">
        Check an email
      </label>
      <div className="flex gap-2">
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className="flex-1 rounded-md border border-neutral-900 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-md border border-neutral-900 px-3 py-2 text-sm font-medium"
        >
          Check email
        </button>
      </div>
      {result && (
        <p className={result.error ? "text-sm text-red-600" : "text-sm"} role="status">
          {result.text}
        </p>
      )}
    </form>
  );
}
