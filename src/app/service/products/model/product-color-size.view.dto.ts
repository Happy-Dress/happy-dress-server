import { ColorDto } from '../../settings/model/color.dto';
import { SizeDto } from '../../settings/model/size.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductColorSizeViewDto {

    @ApiProperty()
    color: ColorDto;

    @ApiProperty()
    size: SizeDto;

}