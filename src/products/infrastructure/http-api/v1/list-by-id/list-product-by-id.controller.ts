import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { V1_PRODUCT } from '../../route.version';
import { ProductService } from 'src/products/application/product.service';
import { Response } from 'express';

@Controller(`${V1_PRODUCT}/:id`)
export class listProductByIdController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProductById(@Param() params: any, @Res() res: Response) {
    try {
      const products = await this.productService.getProductById(params.id);

      if (!products.product) {
        res.statusCode = HttpStatus.NOT_FOUND;

        res.json({
          error: 'Product not found',
        });
      }

      res.json(products);
    } catch (error) {
      res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
