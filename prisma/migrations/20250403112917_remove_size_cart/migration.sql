/*
  Warnings:

  - You are about to drop the column `size` on the `Cart` table. All the data in the column will be lost.
  - Made the column `size` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "size";

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "size" SET NOT NULL;
