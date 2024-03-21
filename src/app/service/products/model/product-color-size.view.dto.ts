import { ColorDto } from '../../settings/model/color.dto';
import { SizeDto } from '../../settings/model/size.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';
import { ProductViewDto } from './product.view.dto';

export class ProductColorSizeViewDto {
    product?: ProductViewDto;

    @ApiProperty()
    color: ColorDto;

    @ApiProperty()
    size: SizeDto;

}