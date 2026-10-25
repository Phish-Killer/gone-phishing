import { readFile } from 'node:fs/promises';
import { prisma } from '@project/db';

const files = [
  new URL('../data/phishing-domains-ACTIVE.txt', import.meta.url),
  new URL('../data/phishing-links-ACTIVE.txt', import.meta.url),
]

export async function importPhishingDB() {
  let safetyScore = await prisma.safetyScore.findUnique({
    where: { id: 'seed-safety-score' },
  });

  if (!safetyScore) {
    safetyScore = await prisma.safetyScore.upsert({
      where: { id: 'seed-safety-score' },
      update: {},
      create: {
        id: 'seed-safety-score',
        label: 'safe',
        levelOfRisk: 0,
      },
    });
  }

  const records = [];

  for (const file of files) {
    const contents = await readFile(file, 'utf8');

    for (const line of contents.split('\n')) {
      const value = line.trim();

      if (!value) continue;

      records.push({ value });
    }
  }

  for (let i = 0; i < records.length; i += 5000) {
    const batch = records.slice(i, i + 5000);

    await prisma.uRL.createMany({
      data: batch.map((record) => ({
        normalizedURL: record.value,
        safetyScoreId: safetyScore.id,
      })),
      skipDuplicates: true,
    });

    console.log(
      `Inserted batch: ${Math.min(i + 5000, records.length)} / ${records.length}`,
    );
  }

  console.log(`Imported ${records.length} records.`);
}

importPhishingDB()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
