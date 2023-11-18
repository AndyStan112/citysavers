/*
  Warnings:

  - You are about to drop the column `currentRole` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentRole",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'USER';
