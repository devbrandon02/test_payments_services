import { Controller, Get } from '@nestjs/common';
import { ProductService } from 'src/products/application/product.service';
import { Product } from 'src/products/domain/product';
import { V1_PRODUCTS } from '../../route.version';

@Controller(V1_PRODUCTS)
export class listProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }
}
