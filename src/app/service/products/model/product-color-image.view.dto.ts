import { ColorEntity } from '../../../repository/settings/color/entity/color.entity';

export class  ProductColorImageViewDto {
    color: ColorEntity;
    
    imageURLs: string[];
}