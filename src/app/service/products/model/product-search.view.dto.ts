import { ProductViewDto } from './product.view.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductSearchViewDto {

    @ApiProperty({ type: [ProductViewDto] })
    products: ProductViewDto[];

    @ApiProperty()
    totalItems: number;

    @ApiProperty()
    itemsPerPage: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    currentPage: number;
}