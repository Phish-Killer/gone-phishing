// Seed script: creates the demo user and starter data.
// Safe to re-run once the data model exists.
// Run via: pnpm db:seed

import { prisma } from "@project/db";

async function main() {
  const safetyScore = await prisma.safetyScore.upsert({
    where: { id: 'seed-safety-score' },
    update: {},
    create: {
      id: 'seed-safety-score',
      label: 'safe',
      levelOfRisk: 0,
    },
  });

  // quick and dirty, don't do it this way maybe
  const url = await prisma.uRL.upsert({
    where: { normalizedURL: 'https://example.com' },
    update: {},
    create: { normalizedURL: 'https://example.com', safetyScoreId: safetyScore.id }
  })

  console.log('initialized seed!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
