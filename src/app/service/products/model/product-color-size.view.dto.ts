import { ColorDto } from '../../settings/model/color.dto';
import { SizeDto } from '../../settings/model/size.dto';

export class ProductColorSizeViewDto {
    color: ColorDto;

    size: SizeDto;

    isAvailable: boolean;

}