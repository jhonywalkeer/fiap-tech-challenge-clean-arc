/*
  Warnings:

  - You are about to drop the `canceled_order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `size` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "canceled_order" DROP CONSTRAINT "canceled_order_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_payment_id_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "payment_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "order_item" ADD COLUMN     "size" TEXT NOT NULL;

-- DropTable
DROP TABLE "canceled_order";

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
