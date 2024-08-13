-- CreateTable
CREATE TABLE "Urlmap" (
    "realUrl" TEXT NOT NULL,
    "userUrl" TEXT NOT NULL,

    CONSTRAINT "Urlmap_pkey" PRIMARY KEY ("realUrl","userUrl")
);
