/*
  Warnings:

  - The values [COMPLETED,FAILED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('DECLINED', 'PENDING', 'APPROVED', 'ERROR', 'VOIDED');
ALTER TABLE "transaction" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "transaction" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "transaction" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
