// Emails endpoint. Theoretically, it retrieves the list of emails that belong
// to a user, if that user is logged in.

import { getDomain } from 'tldts';
import { prisma } from "@project/db";

export async function GET() {
  return Response.json({});
}

//extracts the domain from a URL 
export function extractDomain(url: string): string {
    const domain = getDomain(url.toLocaleLowerCase());

    if (!domain) {
        throw new Error(`Unable to extract domain from URL: ${url}`);
    }
    return domain;
}

//checks DB 
async function checkDB(url: string): Promise<boolean>{
    const domain = extractDomain(url);

    const existing = await prisma.uRL.findUnique({
        where: {
            normalizedURL: domain
        }
    });

    if (existing) {
        // domain exists and is a phishing domain
        return true;
    } else {
        // domain doesn't exist, is not a phishing domain, or at the very least not apart of our DB
        return false;
    }
}
