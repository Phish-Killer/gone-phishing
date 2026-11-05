// Database queries for URLs
// TODO: write logic for inserting URLs into the database
import { prisma } from "@project/db";

export async function listURLs() {
  // TODO (maybe): in Prisma schema, change name of URL model to Url
  // line 168 in packages/db/src/generated/prisma/index.d.ts: prisma.uRL looks ugly
  return prisma.uRL.findMany();
}

// True when any stored entry matches one of `hosts`: a bare host (the domains
// list) or a URL on it (the links list), with or without scheme, "www.",
// user info or port. The trailing boundary stops "evil.com" matching
// "evil.community". An exact lookup runs first because it uses the unique
// index; the pattern scan only runs on a miss.
export async function isDomainInDatabase(hosts: string[]): Promise<boolean> {
  const clean = [...new Set(hosts.map((h) => h.trim().toLowerCase()).filter(Boolean))];
  if (clean.length === 0) return false;

  const exact = await prisma.uRL.findFirst({
    where: { normalizedURL: { in: clean } },
    select: { urlId: true },
  });
  if (exact) return true;

  const alternatives = clean.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const pattern = `^(https?|ftp)://([^/?#@]*@)?(www\\.)?(${alternatives})(:[0-9]+)?([/?#]|$)`;
  const rows = await prisma.$queryRaw<unknown[]>`
    SELECT 1 FROM "URL" WHERE "normalizedURL" ~* ${pattern} LIMIT 1`;
  return rows.length > 0;
}
