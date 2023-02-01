import { ProductDto } from './model/productDto';

export abstract class IProductsService {
  abstract getProduct(id: number): Promise<ProductDto>;

  abstract addProduct(product: ProductDto): Promise<void>;
}