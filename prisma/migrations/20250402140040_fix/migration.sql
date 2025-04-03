/*
  Warnings:

  - The values [null] on the enum `size` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "size_new" AS ENUM ('S', 'M', 'L', 'XL', 'DOUBLEXL');
ALTER TABLE "Cart" ALTER COLUMN "size" DROP DEFAULT;
ALTER TABLE "Cart" ALTER COLUMN "size" TYPE "size_new" USING ("size"::text::"size_new");
ALTER TABLE "OrderItem" ALTER COLUMN "size" TYPE "size_new" USING ("size"::text::"size_new");
ALTER TYPE "size" RENAME TO "size_old";
ALTER TYPE "size_new" RENAME TO "size";
DROP TYPE "size_old";
COMMIT;

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "size" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "size" DROP NOT NULL;
