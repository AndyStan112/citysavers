/*
  Warnings:

  - The `role` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Solution` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "issue_status";

-- DropEnum
DROP TYPE "role";

-- DropEnum
DROP TYPE "solution_status";
