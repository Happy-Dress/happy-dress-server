import { ColorDto } from '../../settings/model/color.dto';

export class  ProductColorImageViewDto {
    color: ColorDto;
    mainImageUrl: string;
    imageURLs: string[];
}