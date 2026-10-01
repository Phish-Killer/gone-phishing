// Database queries for URLs
// TODO: write logic for inserting URLs into the database
import { prisma } from "@project/db";

export async function listURLs() {
  // TODO (maybe): in Prisma schema, change name of URL model to Url
  // line 168 in packages/db/src/generated/prisma/index.d.ts: prisma.uRL looks ugly
  return prisma.uRL.findMany();
}
