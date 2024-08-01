-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_customerId_fkey";

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
