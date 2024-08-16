-- CreateTable
CREATE TABLE "Urlcount" (
    "userUrl" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Urlcount_pkey" PRIMARY KEY ("userUrl")
);

-- CreateIndex
CREATE UNIQUE INDEX "Urlcount_userUrl_key" ON "Urlcount"("userUrl");
