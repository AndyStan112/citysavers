-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "partner" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "photoUrl" TEXT,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);
