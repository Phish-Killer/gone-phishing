// URL endpoint. For now, it only retrieves all URLs in the database and
// displays them to the user, whether they're signed in or not.

import { listURLs } from "@project/domain";

export async function GET() {
  const urls = await listURLs();

  return Response.json({ urls });
}
