import { IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductSearchDto {

    @ApiProperty()
    @IsInt()
    limit: number;

    @ApiProperty()
    @IsInt()
    page: number;

    @ApiPropertyOptional()
    categoryId?: number;

    @ApiPropertyOptional({ type: [Number] })
    modelIds?: number[];

    @ApiPropertyOptional({ type: [Number] })
    materialIds?: number[];
    
    @ApiPropertyOptional({ type: [Number] })
    colorIds?: number[];
    
    @ApiPropertyOptional({ type: [Number] })
    sizeIds?: number[];

    @ApiPropertyOptional()
    name?: string;
    
}