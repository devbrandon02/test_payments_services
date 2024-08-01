import { ListAllProductsDto } from '../dto/list-all-products.dto';
import { ListProductByIdDto } from '../dto/list-product-by-id.dto';

export interface IProductRepository {
  findAll(): Promise<ListAllProductsDto>;
  findById(id: string): Promise<ListProductByIdDto | null>;
}
