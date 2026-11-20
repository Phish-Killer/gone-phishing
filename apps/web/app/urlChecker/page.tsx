"use client";

import { useState, type CSSProperties, React.FormEvent<HTMLFormElement> } from "react";

// Change this to wherever your route.ts lives.
const ENDPOINT = "/api/urls";
const emailENDPOINT = "/api/emails"

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
  const [activeTab, setActiveTab] = useState<"url" | "email">("url");
  const [emailContent, setEmailContent] = useState("");

  const [email, setEmail] = useState("");

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

  async function handleEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();

    if (!trimmed) {
      setStatus({ kind: "error", message: "Enter a Email to check." });
      return;
    }
    setStatus({ kind: "loading" });

    try {
      const res = await fetch(emailENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
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
    <>

      <section style={styles.wrapper}>
        <div style={styles.tabs}>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            style={activeTab === "url" ? styles.activeTab : styles.tab}
          >
            URL Checker
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("email")}
            style={activeTab === "email" ? styles.activeTab : styles.tab}
          >
            Email Checker
          </button>
        </div>
        {activeTab === "url" && (
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
        )}

        {activeTab === "email" && (
          <form onSubmit={handleEmailSubmit} style={styles.form} noValidate>
            <label htmlFor="email-input" style={styles.label}>
              Check an Email
            </label>
            <div style={styles.row}>
              <input
                id="email-input"
                type="email"
                placeholder="ExampleEmail@testsite.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                style={styles.input}
              />
            </div>
            <textarea
              placeholder="Paste the email contents here for AI analysis..."
              rows={8}
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              style={styles.textarea}
            />

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Analyzing…" : "Analyze Email with AI"}
            </button>
          </form>
        )}



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
        <div style={styles.historyBox}>
          <h2 style={styles.history}>History</h2>
        </div>
      </section>
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: { maxWidth: "920px", margin: "2rem auto", padding: "0 1rem" },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    border: "2px solid grey",
    padding: "20px",
    borderRadius: "20px"
  },
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
    background: "lightBlue",
    color: "inherit",
    cursor: "pointer",

  },
  output: { minHeight: "1.5rem", marginTop: "1rem" },
  muted: { opacity: 0.65 },
  history: { textAlign: "center", fontWeight: "600", paddingTop: "20px", paddingBottom: "10px", backgroundColor: "lightGrey", },
  historyBox: {
    height: "20vh",
    border: "2px solid grey",
    borderRadius: "20px",
    overflow: "hidden",
  },
  tabs: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },

  tab: {
    flex: 1,
    padding: "0.75rem",
    border: "1px solid grey",
    borderRadius: "10px",
    background: "transparent",
    cursor: "pointer",
  },

  activeTab: {
    flex: 1,
    padding: "0.75rem",
    border: "1px solid grey",
    borderRadius: "10px",
    background: "lightBlue",
    fontWeight: 600,
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    minHeight: "180px",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid grey",
    borderRadius: "8px",
    background: "transparent",
    color: "inherit",
    resize: "vertical",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
};
