import { describe, it, expect, vi, beforeEach } from "vitest";

// POST /api/emails: extracts the domain, then reports whether it is in the database.

const isDomainInDatabase = vi.hoisted(() => vi.fn());

vi.mock("@project/domain", async () => ({
  ParseEmail: (await import("../../packages/domain/src/schemas/email-parser")).ParseEmail,
  isDomainInDatabase,
}));

import { POST } from "../../apps/web/app/api/emails/route";

const post = (body: unknown) =>
  POST(
    new Request("http://localhost/api/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );

beforeEach(() => {
  isDomainInDatabase.mockReset();
});

describe("POST /api/emails", () => {
  it("reports a known domain", async () => {
    isDomainInDatabase.mockResolvedValue(true);
    const res = await post({ email: "scam@evil.com" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ domain: "evil.com", checked: true, inDatabase: true });
    expect(isDomainInDatabase).toHaveBeenCalledWith(["evil.com"]);
  });

  it("reports an unknown domain", async () => {
    isDomainInDatabase.mockResolvedValue(false);
    const res = await post({ email: "hi@fake.com" });
    expect(await res.json()).toEqual({ domain: "fake.com", checked: true, inDatabase: false });
  });

  it("checks the full host and its parent domains, and reports the host", async () => {
    isDomainInDatabase.mockResolvedValue(true);
    const res = await post({ email: "a@mail.evil.com" });
    expect(await res.json()).toEqual({ domain: "mail.evil.com", checked: true, inDatabase: true });
    expect(isDomainInDatabase).toHaveBeenCalledWith(["mail.evil.com", "evil.com"]);
  });

  it("rejects an invalid email without querying the database", async () => {
    const res = await post({ email: "nope" });
    expect(res.status).toBe(400);
    expect((await res.json()).error.code).toBe("VALIDATION");
    expect(isDomainInDatabase).not.toHaveBeenCalled();
  });

  it("hides raw errors when the lookup fails", async () => {
    isDomainInDatabase.mockImplementation(async () => {
      throw new Error("connection refused at 10.0.0.5");
    });
    const res = await post({ email: "a@fake.com" });
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error.code).toBe("INTERNAL");
    expect(JSON.stringify(body)).not.toContain("10.0.0.5");
  });
});
