// URL endpoint. For now, it only retrieves all URLs in the database and
// displays them to the user, whether they're signed in or not.

import { listURLs } from "@project/domain";
import { getDomain } from 'tldts';

export async function GET() {
  const urls = await listURLs();

  return Response.json({ urls });
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
