-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "URL" (
    "urlId" TEXT NOT NULL,
    "normalizedURL" TEXT NOT NULL,
    "safetyScoreId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "URL_pkey" PRIMARY KEY ("urlId")
);

-- CreateTable
CREATE TABLE "SafetyScore" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "levelOfRisk" INTEGER NOT NULL,
    "feedback" TEXT[],

    CONSTRAINT "SafetyScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserURLs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserURLs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BlockedURLs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BlockedURLs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "URL_normalizedURL_key" ON "URL"("normalizedURL");

-- CreateIndex
CREATE INDEX "URL_domain_idx" ON "URL"("domain");

-- CreateIndex
CREATE INDEX "_UserURLs_B_index" ON "_UserURLs"("B");

-- CreateIndex
CREATE INDEX "_BlockedURLs_B_index" ON "_BlockedURLs"("B");

-- AddForeignKey
ALTER TABLE "URL" ADD CONSTRAINT "URL_safetyScoreId_fkey" FOREIGN KEY ("safetyScoreId") REFERENCES "SafetyScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserURLs" ADD CONSTRAINT "_UserURLs_A_fkey" FOREIGN KEY ("A") REFERENCES "URL"("urlId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserURLs" ADD CONSTRAINT "_UserURLs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedURLs" ADD CONSTRAINT "_BlockedURLs_A_fkey" FOREIGN KEY ("A") REFERENCES "URL"("urlId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedURLs" ADD CONSTRAINT "_BlockedURLs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

