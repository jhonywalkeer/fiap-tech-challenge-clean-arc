/*
  Warnings:

  - You are about to drop the `order_options` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_options" DROP CONSTRAINT "order_options_order_item_id_fkey";

-- DropTable
DROP TABLE "order_options";
