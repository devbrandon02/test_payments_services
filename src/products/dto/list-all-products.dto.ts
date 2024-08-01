import { Product } from '../domain/product';

export interface ListAllProductsDto {
  version: string;
  products: Product[];
}
