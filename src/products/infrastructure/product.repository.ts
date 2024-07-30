import prisma from 'prisma/client/prisma-client';
import { Product } from '../domain/product';
import { IProductRepository } from '../domain/product-repository';

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return null;

    return new Product(
      product.id,
      product.name,
      product.price,
      product.image,
      product.description,
      product.createdAt,
      product.updatedAt,
    );
  }
}
