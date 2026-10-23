// URL endpoint. For now, it only retrieves all URLs in the database and
// displays them to the user, whether they're signed in or not.

import { listURLs } from "@project/domain";
import { getDomain } from "tldts";
import { ParseUrl } from "@project/domain";

export async function GET() {
  const urls = await listURLs();

  return Response.json({ urls });
}


function extractDomain(url: string): string | null {
  const rawDomain = url.toLowerCase();
  const domain = getDomain(rawDomain);

  if (!domain) {
    throw new Error(`Unable to extract domain from email: ${url}`);
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

  const parsed = ParseUrl.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: { code: "VALIDATION", message: parsed.error.issues[0]?.message ?? "Invalid input" } },
      { status: 400 }
    );
  }

  let domain: string | null;
  try {
    domain = extractDomain(parsed.data.url);
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