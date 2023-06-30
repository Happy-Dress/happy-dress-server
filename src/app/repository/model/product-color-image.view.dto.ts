import { ColorDto } from '../../service/settings/model/color.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductColorImageViewDto {
    @ApiProperty()
    color: ColorDto;
    
    @ApiProperty()
    mainImageUrl: string;
    
    @ApiProperty({ type: [String] })
    imageURLs: string[];
}