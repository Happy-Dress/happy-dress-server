import { ColorDto } from '../../service/settings/model/color.dto';
import { SizeDto } from '../../service/settings/model/size.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductColorSizeViewDto {

    @ApiProperty()
    color: ColorDto;

    @ApiProperty()
    size: SizeDto;

}