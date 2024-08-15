/*
  Warnings:

  - The primary key for the `Urlmap` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userUrl]` on the table `Urlmap` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Urlmap" DROP CONSTRAINT "Urlmap_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Urlmap_userUrl_key" ON "Urlmap"("userUrl");
