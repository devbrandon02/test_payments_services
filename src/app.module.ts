import { Module } from '@nestjs/common';
import { ProductsModule } from './products/infrastructure/product.module';
import { TransactionModule } from './transactions/infrastructure/transaction.module';

@Module({
  imports: [ProductsModule, TransactionModule],
})
export class AppModule {}
