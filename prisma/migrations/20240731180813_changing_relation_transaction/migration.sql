/*
  Warnings:

  - You are about to drop the `detail_transaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "detail_transaction" DROP CONSTRAINT "detail_transaction_customerId_fkey";

-- DropForeignKey
ALTER TABLE "detail_transaction" DROP CONSTRAINT "detail_transaction_transactionId_fkey";

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "customerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "detail_transaction";

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
