import { CategoryDto } from '../../settings/model/category.dto';
import { ModelDto } from '../../settings/model/model.dto';
import { MaterialDto } from '../../settings/model/material.dto';
import { SimpleListSetting } from '../../util/model/dto/simple.list.setting';
import { ProductColorSizeViewDto } from './product-color-size.view.dto';
import { ProductColorImageViewDto } from './product-color-image.view.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductViewDto extends SimpleListSetting {

    @ApiProperty()
    description: string;

    @ApiProperty()
    category: CategoryDto;

    @ApiProperty()
    model: ModelDto;

    @ApiProperty({ type: [MaterialDto] })
    materials: MaterialDto[];

    @ApiProperty({ type: [ProductColorSizeViewDto] })
    productColorSizes: ProductColorSizeViewDto[];

    @ApiProperty({ type: [ProductColorImageViewDto] })
    productColorImages: ProductColorImageViewDto[];
}
