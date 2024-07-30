/*
  Warnings:

  - Added the required column `order_id` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qr_code` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "payment_date" TIMESTAMP(3),
ADD COLUMN     "qr_code" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
