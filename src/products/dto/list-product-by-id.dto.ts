import { Product } from '../domain/product';

export interface ListProductByIdDto {
  version: string;
  product: Product | null;
}
