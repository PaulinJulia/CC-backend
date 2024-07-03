/*
  Warnings:

  - You are about to drop the column `level` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `basePrompt` on the `Story` table. All the data in the column will be lost.
  - Added the required column `summary` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "level";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "basePrompt",
ADD COLUMN     "summary" TEXT NOT NULL;
