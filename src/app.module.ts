import { Module } from '@nestjs/common';
import { ProductsModule } from './products/infrastructure/product.module';

@Module({
  imports: [ProductsModule],
})
export class AppModule {}
