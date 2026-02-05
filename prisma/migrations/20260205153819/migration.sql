-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentMethod" TEXT DEFAULT 'CASH ON DELIVERY',
ADD COLUMN     "shippingAddress" TEXT NOT NULL DEFAULT 'Bangladesh';
