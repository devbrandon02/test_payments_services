import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../domain/product-repository';
import { Product } from '../domain/product';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
