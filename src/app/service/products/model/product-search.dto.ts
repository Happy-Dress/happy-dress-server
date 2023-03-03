import { IsInt } from 'class-validator';

export class ProductSearchDto {
    
    @IsInt()
    limit: number;

    @IsInt()
    page: number;

    categoryId?: number;

    modelIds?: number[];
    
    materialIds?: number[];
    
    name?: string;
    
}