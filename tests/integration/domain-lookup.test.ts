import { describe, it, expect, beforeAll } from "vitest";

// isDomainInDatabase: does any stored URL belong to this domain ?

type Domain = typeof import("@project/domain");
let domain: Domain;

beforeAll(async () => {
  process.env.PGLITE_DATA_DIR = "memory://";
  delete process.env.DATABASE_URL;
  const { prisma } = await import("@project/db");
  domain = await import("@project/domain");

  const score = await prisma.safetyScore.create({
    data: { label: "phishing", levelOfRisk: 9 },
  });
  for (const normalizedURL of [
    "https://evil.com/login",
    "https://www.bad.org",
    "plain.net",
    "x.shared.com",
    "ftp://me@ftp-bad.org:21/x",
  ]) {
    await prisma.uRL.create({ data: { normalizedURL, safetyScoreId: score.id } });
  }
}, 30000);

describe("isDomainInDatabase", () => {
  it("finds a host that has a stored URL", async () => {
    expect(await domain.isDomainInDatabase(["evil.com"])).toBe(true);
  });

  it("finds a host stored as a www URL", async () => {
    expect(await domain.isDomainInDatabase(["bad.org"])).toBe(true);
  });

  it("finds a host stored bare, as in the domains list", async () => {
    expect(await domain.isDomainInDatabase(["plain.net"])).toBe(true);
  });

  it("finds an ftp URL, ignoring user info and port", async () => {
    expect(await domain.isDomainInDatabase(["ftp-bad.org"])).toBe(true);
  });

  it("matches a listed parent domain when the email host is a subdomain", async () => {
    expect(await domain.isDomainInDatabase(["mail.bad.org", "bad.org"])).toBe(true);
  });

  it("matches the exact subdomain that is listed", async () => {
    expect(await domain.isDomainInDatabase(["x.shared.com", "shared.com"])).toBe(true);
  });

  it("does not flag a shared host just because one subdomain is listed", async () => {
    expect(await domain.isDomainInDatabase(["y.shared.com", "shared.com"])).toBe(false);
  });

  it("returns false for an unknown host", async () => {
    expect(await domain.isDomainInDatabase(["good.com"])).toBe(false);
  });

  it("does not match a host that merely ends with a stored one", async () => {
    expect(await domain.isDomainInDatabase(["notevil.com"])).toBe(false);
  });

  it("does not match a longer host that starts with a stored one", async () => {
    expect(await domain.isDomainInDatabase(["evil.co"])).toBe(false);
  });

  it("is case-insensitive", async () => {
    expect(await domain.isDomainInDatabase(["EVIL.com"])).toBe(true);
  });

  it("returns false for no hosts", async () => {
    expect(await domain.isDomainInDatabase([])).toBe(false);
  });
});
