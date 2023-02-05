import { ProductDto } from './model/productDto';
import { UpdateProductDto } from './model/updateProductDto';


export abstract class IProductsService {
  abstract getProduct(id: number): Promise<ProductDto>;

  abstract addProduct(product: UpdateProductDto): Promise<ProductDto>;

  abstract deleteProduct(id: number): Promise<void>;
}