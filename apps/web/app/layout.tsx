// Root layout for the Next.js app. Wraps every page with the HTML shell and
// global styles. No layout logic — just structure and metadata.
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starter Skeleton",
  description: "C12 Fall 2026 — every layer exists; the weeks make them deep.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-neutral-900 antialiased">
        <header className="w-full border-b border-neutral-200 px-8 py-4">
          <h2 className="m-0 text-xl font-semibold">Gone Phishing</h2>
          <h3>Real Time Phishing </h3>
        </header>
        <main className="mx-auto max-w-2xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}