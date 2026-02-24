/*
  Warnings:

  - You are about to alter the column `subtotal` on the `CartItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "subtotal" SET DATA TYPE DECIMAL(10,2);
