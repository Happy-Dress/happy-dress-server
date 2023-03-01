import { ProductViewDto } from './product.view.dto';

export class ProductSearchViewDto {
    products: ProductViewDto[];
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}