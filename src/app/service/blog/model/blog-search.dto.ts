import { ApiPropertyOptional } from '@nestjs/swagger';

export class BlogSearchDto {
    @ApiPropertyOptional()
    name?: string;

    @ApiPropertyOptional()
    shortDescription?: string;
}