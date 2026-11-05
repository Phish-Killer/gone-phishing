import { ParseEmail, isDomainInDatabase } from "@project/domain";
import { getDomain } from "tldts";

// The email's host first, then each parent up to its registrable domain:
// "a@mail.evil.com" -> ["mail.evil.com", "evil.com"]. The list holds exact
// hostnames, so the full host must be checked, but a listed parent also counts.
function extractHosts(email: string): string[] | null {
  const lastAt = email.lastIndexOf("@");
  if (lastAt === -1) {
    return null;
  }

  const host = email.slice(lastAt + 1).trim().toLowerCase();
  const registrable = getDomain(host);

  if (!registrable) {
    throw new Error(`Unable to extract domain from email: ${email}`);
  }

  const labels = host.split(".");
  const hosts: string[] = [];
  for (let i = 0; i < labels.length; i++) {
    const candidate = labels.slice(i).join(".");
    hosts.push(candidate);
    if (candidate === registrable) break;
  }
  return hosts;
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

  let hosts: string[] | null;
  try {
    hosts = extractHosts(parsed.data.email);
  } catch {
    hosts = null;
  }

  if (!hosts) {
    return Response.json(
      { error: { code: "DOMAIN_EXTRACTION_FAILED", message: "Could not extract a domain from the provided email." } },
      { status: 422 }
    );
  }

  try {
    const inDatabase = await isDomainInDatabase(hosts);
    return Response.json({ domain: hosts[0], checked: true, inDatabase });
  } catch {
    return Response.json(
      { error: { code: "INTERNAL", message: "Could not check the database." } },
      { status: 500 }
    );
  }
}
// Emails endpoint. Theoretically, it retrieves the list of emails that belong
// to a user, if that user is logged in.

export async function GET() {
  return Response.json({});
}
