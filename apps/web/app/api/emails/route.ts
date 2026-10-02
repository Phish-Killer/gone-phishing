// Emails endpoint. Theoretically, it retrieves the list of emails that belong
// to a user, if that user is logged in.

import { getDomain } from 'tldts';
import { prisma } from "@project/db";

export async function GET() {
  return Response.json({});
}


//checks DB 
// extracts the domain from a URL
function extractDomain(url: string): string {
    const domain = getDomain(url.toLowerCase());

    if (!domain) {
        throw new Error(`Unable to extract domain from URL: ${url}`);
    }
    return domain;
}

// checks DB
async function checkDB(url: string): Promise<boolean> {
    const domain = extractDomain(url);

    const existing = await prisma.uRL.findUnique({
        where: { normalizedURL: domain },
    });

    return existing !== null;
}