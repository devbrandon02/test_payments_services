import { listProductByIdController } from './http-api/v1/list-by-id/list-product-by-id.controller';
import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductService } from '../application/product.service';
import { listProductsController } from './http-api/v1/list-products/list-products.controller';

@Module({
  controllers: [listProductsController, listProductByIdController],
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
