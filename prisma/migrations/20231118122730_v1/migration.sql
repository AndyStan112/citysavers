/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "issue_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PENDING_SOLVED', 'SOLVED');

-- CreateEnum
CREATE TYPE "solution_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "currentRole" "role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "status" "issue_status" NOT NULL,
    "userId" TEXT NOT NULL,
    "issueCategoryId" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL,
    "locationType" TEXT NOT NULL,
    "priority" "priority" NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solution" (
    "id" TEXT NOT NULL,
    "status" "solution_status" NOT NULL,
    "statusMessage" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "coins" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "issueId" TEXT,
    "solutionId" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssueCategory" (
    "id" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "isCommunitySolvable" BOOLEAN NOT NULL,

    CONSTRAINT "IssueCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_issueId_key" ON "Transaction"("id", "issueId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_solutionId_key" ON "Transaction"("id", "solutionId");

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_issueCategoryId_fkey" FOREIGN KEY ("issueCategoryId") REFERENCES "IssueCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE SET NULL ON UPDATE CASCADE;
