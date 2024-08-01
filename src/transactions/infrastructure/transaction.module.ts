import { Module } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { createPaymentController } from './http-api/v1/create-payment/create-transaction.controller';
import { AcceptanceTokenController } from './http-api/v1/get-acceptance-token/get-acceptance-token.controller';
import { TransactionService } from '../application/transaction.service';

@Module({
  controllers: [createPaymentController, AcceptanceTokenController],
  providers: [
    TransactionService,
    {
      provide: 'TransactionRepository',
      useClass: TransactionRepository,
    },
  ],
  exports: [TransactionService],
})
export class TransactionModule {}
