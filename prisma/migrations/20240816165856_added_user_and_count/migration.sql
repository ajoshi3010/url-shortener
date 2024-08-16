-- CreateTable
CREATE TABLE "Userurls" (
    "userId" TEXT NOT NULL,
    "userUrl" TEXT NOT NULL,

    CONSTRAINT "Userurls_pkey" PRIMARY KEY ("userId","userUrl")
);
