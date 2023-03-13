import { ColorDto } from '../../settings/model/color.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductColorImageViewDto {
    @ApiProperty()
    color: ColorDto;

    
    @ApiProperty({ type: [String] })
    imageURLs: string[];
}