-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_shortUrlId_fkey";

-- DropForeignKey
ALTER TABLE "ShortURL" DROP CONSTRAINT "ShortURL_userId_fkey";

-- AddForeignKey
ALTER TABLE "ShortURL" ADD CONSTRAINT "ShortURL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_shortUrlId_fkey" FOREIGN KEY ("shortUrlId") REFERENCES "ShortURL"("shortUrl") ON DELETE CASCADE ON UPDATE CASCADE;
