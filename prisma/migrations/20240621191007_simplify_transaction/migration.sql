/*
  Warnings:

  - You are about to drop the column `issueId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `solutionId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_issueId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_solutionId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "issueId",
DROP COLUMN "solutionId";
