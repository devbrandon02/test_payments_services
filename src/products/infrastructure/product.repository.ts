import prisma from 'prisma/client/prisma-client';
import { Product } from '../domain/product';
import { IProductRepository } from '../domain/product-repository';
import { ListAllProductsDto } from '../dto/list-all-products.dto';
import { ListProductByIdDto } from '../dto/list-product-by-id.dto';

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<ListAllProductsDto> {
    const products = await prisma.product.findMany();

    if (!products) return { version: '1', products: [] };

    return {
      version: '1',
      products: products.map(
        (product) =>
          new Product(
            product.id,
            product.name,
            product.price,
            product.image,
            product.stock,
            product.description,
            product.createdAt,
            product.updatedAt,
          ),
      ),
    };
  }

  async findById(id: string): Promise<ListProductByIdDto> {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return { version: '1', product: null };
    }

    return {
      version: '1',
      product: new Product(
        product.id,
        product.name,
        product.price,
        product.image,
        product.stock,
        product.description,
        product.createdAt,
        product.updatedAt,
      ),
    };
  }
}
