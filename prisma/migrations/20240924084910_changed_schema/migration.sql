/*
  Warnings:

  - You are about to drop the `Urlcount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Urlmap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Userurls` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Urlcount";

-- DropTable
DROP TABLE "Urlmap";

-- DropTable
DROP TABLE "Userurls";

-- CreateTable
CREATE TABLE "ShortURL" (
    "shortUrl" TEXT NOT NULL,
    "realUrl" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "ShortURL_pkey" PRIMARY KEY ("shortUrl")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Click" (
    "id" SERIAL NOT NULL,
    "shortUrlId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortURL_shortUrl_key" ON "ShortURL"("shortUrl");

-- AddForeignKey
ALTER TABLE "ShortURL" ADD CONSTRAINT "ShortURL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_shortUrlId_fkey" FOREIGN KEY ("shortUrlId") REFERENCES "ShortURL"("shortUrl") ON DELETE RESTRICT ON UPDATE CASCADE;
