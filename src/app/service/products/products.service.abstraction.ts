import { ProductDto } from '../../repository/model/product.dto';
import { ProductViewDto } from '../../repository/model/product.view.dto';
import { ProductSearchDto } from '../../repository/model/product-search.dto';
import { ProductSearchViewDto } from '../../repository/model/product-search.view.dto';


export abstract class IProductsService {

  abstract getProduct(id: number): Promise<ProductViewDto>;

  abstract createProduct(product: ProductDto): Promise<ProductViewDto>;

  abstract updateProduct(id: number, product: ProductDto): Promise<ProductViewDto>;

  abstract deleteProduct(id: number): Promise<void>;

  abstract searchProducts(productSearchDto: ProductSearchDto): Promise<ProductSearchViewDto>;
}
