import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../domain/product-repository';
import { ListAllProductsDto } from '../dto/list-all-products.dto';
import { ListProductByIdDto } from '../dto/list-product-by-id.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async getProductById(id: string): Promise<ListProductByIdDto | null> {
    return this.productRepository.findById(id);
  }

  async getAllProducts(): Promise<ListAllProductsDto> {
    return this.productRepository.findAll();
  }
}
