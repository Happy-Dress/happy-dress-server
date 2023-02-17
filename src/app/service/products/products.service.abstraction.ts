import { ProductDto } from './model/product.dto';
import { ProductViewDto } from './model/product.view.dto';


export abstract class IProductsService {

  abstract getProduct(id: number): Promise<ProductViewDto>;

  abstract createProduct(product: ProductDto): Promise<ProductViewDto>;

  abstract updateProduct(id: number, product: ProductDto): Promise<ProductViewDto>;

  abstract deleteProduct(id: number): Promise<void>;
}
