import { ProductDto } from './model/product.dto';
import { ProductViewDto } from './model/product.view.dto';
import { ProductSearchDto } from './model/product-search.dto';
import { ProductSearchViewDto } from './model/product-search.view.dto';


export abstract class IProductsService {
  abstract getProduct(id: number): Promise<ProductViewDto>;

  abstract createProduct(product: ProductDto): Promise<ProductViewDto>;

  abstract updateProduct(
    id: number,
    product: ProductDto
  ): Promise<ProductViewDto>;

  abstract deleteProducts(ids: Set<number>): Promise<void>;

  abstract searchProducts(
    productSearchDto: ProductSearchDto
  ): Promise<ProductSearchViewDto>;
}
