/*
  Warnings:

  - Added the required column `brandName` to the `medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicine" ADD COLUMN     "brandName" VARCHAR(100) NOT NULL,
ADD COLUMN     "imageUrl" VARCHAR(500) NOT NULL;
