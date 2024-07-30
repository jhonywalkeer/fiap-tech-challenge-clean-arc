/*
  Warnings:

  - You are about to drop the column `order_itemId` on the `order_options` table. All the data in the column will be lost.
  - Added the required column `observation` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_options" DROP CONSTRAINT "order_options_order_itemId_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "observation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_options" DROP COLUMN "order_itemId",
ADD COLUMN     "order_item_id" TEXT;

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "user_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "canceled_order" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "canceled_order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_options" ADD CONSTRAINT "order_options_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "order_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canceled_order" ADD CONSTRAINT "canceled_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
