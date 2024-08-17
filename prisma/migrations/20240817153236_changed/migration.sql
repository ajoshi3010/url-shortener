/*
  Warnings:

  - The primary key for the `Userurls` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userUrl]` on the table `Userurls` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Userurls" DROP CONSTRAINT "Userurls_pkey",
ADD CONSTRAINT "Userurls_pkey" PRIMARY KEY ("userUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Userurls_userUrl_key" ON "Userurls"("userUrl");
