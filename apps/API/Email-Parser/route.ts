import { ParseEmail } from "@project/domain";
import { getDomain } from "tldts";

function extractDomain(email: string): string | null {
  const lastAt = email.lastIndexOf("@");
  if (lastAt === -1) {
    return null;
  }

  const rawDomain = email.slice(lastAt + 1).trim().toLowerCase();
  const domain = getDomain(rawDomain);

  if (!domain) {
    throw new Error(`Unable to extract domain from email: ${email}`);
  }

  return domain;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: { code: "BAD_JSON", message: "Body must be valid JSON" } },
      { status: 400 }
    );
  }

  const parsed = ParseEmail.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: { code: "VALIDATION", message: parsed.error.issues[0]?.message ?? "Invalid input" } },
      { status: 400 }
    );
  }

  let domain: string | null;
  try {
    domain = extractDomain(parsed.data.email);
  } catch {
    domain = null;
  }

  if (!domain) {
    return Response.json(
      { error: { code: "DOMAIN_EXTRACTION_FAILED", message: "Could not extract a domain from the provided email." } },
      { status: 422 }
    );
  }

  return Response.json({ domain, checked: false });
}