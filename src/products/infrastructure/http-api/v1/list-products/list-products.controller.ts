import { Controller, Get, Res } from '@nestjs/common';
import { ProductService } from 'src/products/application/product.service';
import { V1_PRODUCTS } from '../../route.version';
import { ListAllProductsDto } from 'src/products/dto/list-all-products.dto';
import { Response } from 'express';
import { ErrorsDto } from 'src/products/dto/error-product.dto';

@Controller(V1_PRODUCTS)
export class listProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Res() res: Response,
  ): Promise<ListAllProductsDto | ErrorsDto> {
    try {
      const products = await this.productService.getAllProducts();

      if (!products.products) {
        res.statusCode = 404;

        res.json({
          error: 'Products not found',
        });
      }

      res.json(products);
    } catch (error) {
      res.statusCode = 500;

      return {
        error: 'Internal Server Error',
      };
    }
  }
}
