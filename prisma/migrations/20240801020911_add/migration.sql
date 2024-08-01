/*
  Warnings:

  - Added the required column `baseFee` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryFee` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "number_identification" TEXT;

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "baseFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "deliveryFee" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "TransactionDetail" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "TransactionDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransactionDetail" ADD CONSTRAINT "TransactionDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDetail" ADD CONSTRAINT "TransactionDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
