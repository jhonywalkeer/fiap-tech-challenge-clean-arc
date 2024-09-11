/*
  Warnings:

  - You are about to drop the column `size` on the `order_item` table. All the data in the column will be lost.
  - Added the required column `size` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "size";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "size" TEXT NOT NULL;
