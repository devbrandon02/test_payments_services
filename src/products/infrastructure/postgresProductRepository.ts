import prisma from 'prisma/client/prisma-client';
import { IProductRepository } from '../domain/product-repository';
import { Product } from '../domain/product';

export class PostgresProductRepository implements IProductRepository {
  findById(id: string): Promise<Product | null> {
    throw new Error('Method not implemented.');
  }
  
  async findAll() {
    const products = prisma.product.findMany();

    if (!products) return [];

    return products;
  }
}
