"use client";

import { useState, type CSSProperties, type FormEvent } from "react";

// Change this to wherever your route.ts lives.
const ENDPOINT = "/api/urls";

type CheckResult = {
  domain: string;
  checked: boolean;
  found: boolean;
};

type ApiError = {
  error: { code: string; message: string };
};

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "result"; url: string; result: CheckResult }
  | { kind: "error"; message: string };

export default function UrlChecker() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = url.trim();
    if (!trimmed) {
      setStatus({ kind: "error", message: "Enter a URL to check." });
      return;
    }

    setStatus({ kind: "loading" });

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      const data: CheckResult | ApiError = await res.json();

      if (!res.ok || "error" in data) {
        const message =
          "error" in data ? data.error.message : "Something went wrong.";
        setStatus({ kind: "error", message });
        return;
      }

      setStatus({ kind: "result", url: trimmed, result: data });
    } catch {
      setStatus({
        kind: "error",
        message: "Couldn't reach the server. Check your connection and try again.",
      });
    }
  }

  const loading = status.kind === "loading";

  return (
    <section style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <label htmlFor="url-input" style={styles.label}>
          Check a URL
        </label>
        <div style={styles.row}>
          <input
            id="url-input"
            type="search"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            placeholder="https://example.com/page"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Checking…" : "Check URL"}
          </button>
        </div>
      </form>

      <div role="status" aria-live="polite" style={styles.output}>
        {status.kind === "result" && (
          <p style={{ margin: 0 }}>
            {status.result.found ? (
              <>
                <strong>{status.url}</strong> is in the database.
              </>
            ) : (
              <>
                <strong>{status.url}</strong> is not in the database.
              </>
            )}{" "}
            <span style={styles.muted}>Domain: {status.result.domain}</span>
          </p>
        )}
        {status.kind === "error" && (
          <p style={{ margin: 0, color: "#b3261e" }}>{status.message}</p>
        )}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: { maxWidth: 560, margin: "2rem auto", padding: "0 1rem" },
  form: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  label: { fontWeight: 600 },
  row: { display: "flex", gap: "0.5rem" },
  input: {
    flex: 1,
    minWidth: 0,
    padding: "0.6rem 0.75rem",
    fontSize: "1rem",
    border: "1px solid currentColor",
    borderRadius: 6,
    background: "transparent",
    color: "inherit",
  },
  button: {
    padding: "0.6rem 1rem",
    fontSize: "1rem",
    fontWeight: 600,
    border: "1px solid currentColor",
    borderRadius: 6,
    background: "transparent",
    color: "inherit",
    cursor: "pointer",
  },
  output: { minHeight: "1.5rem", marginTop: "1rem" },
  muted: { opacity: 0.65 },
};
