import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductService } from '../application/product.service';
import { listProductsController } from './http-api/v1/list_products/list-products.controller';

@Module({
  controllers: [listProductsController],
  providers: [
    ProductService,
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
  ],
  exports: [ProductService],
})
export class ProductsModule {}
