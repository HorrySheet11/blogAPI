/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `JwtBlacklist` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `JwtBlacklist` table. All the data in the column will be lost.
  - Added the required column `expiresIn` to the `JwtBlacklist` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "JwtBlacklist_expiresAt_idx";

-- AlterTable
ALTER TABLE "JwtBlacklist" DROP COLUMN "expiresAt",
DROP COLUMN "reason",
ADD COLUMN     "expiresIn" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "JwtBlacklist_expiresIn_idx" ON "JwtBlacklist"("expiresIn");
