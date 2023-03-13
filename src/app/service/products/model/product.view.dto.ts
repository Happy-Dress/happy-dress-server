import { CategoryDto } from '../../settings/model/category.dto';
import { ModelDto } from '../../settings/model/model.dto';
import { MaterialDto } from '../../settings/model/material.dto';
import { SimpleListSetting } from '../../util/model/dto/simple.list.setting';
import { ProductColorSizeViewDto } from './product-color-size.view.dto';
import { ProductColorImageViewDto } from './product-color-image.view.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { INVALID_NAME_DETECTED, NAME_TOO_LONG, NAME_TOO_SHORT } from '../../../messages/constants/messages.constants';

const MIN_LENGTH_NAME = 3;
const MAX_LENGTH_NAME = 20;

export class ProductViewDto implements Omit<SimpleListSetting, 'orderNumber'> {

    @ApiPropertyOptional()
    id?: number;

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

    @ApiProperty()
    @IsString()
    @MinLength(MIN_LENGTH_NAME, { message: NAME_TOO_SHORT })
    @MaxLength(MAX_LENGTH_NAME, { message: NAME_TOO_LONG })
    @Matches(/^[а-яА-Яa-zA-Z0-9_.,\s\-]+$/, { message: INVALID_NAME_DETECTED })
    name: string;
}
