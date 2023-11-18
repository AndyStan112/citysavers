/*
  Warnings:

  - You are about to drop the column `description` on the `Issue` table. All the data in the column will be lost.
  - Added the required column `category` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_issueCategoryId_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "description",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "moreDetails" TEXT,
ALTER COLUMN "issueCategoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_issueCategoryId_fkey" FOREIGN KEY ("issueCategoryId") REFERENCES "IssueCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
