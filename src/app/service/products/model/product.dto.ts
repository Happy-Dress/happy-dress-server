import { ProductColorSizeDto } from './product-color-size.dto';
import { ProductColorImageDto } from './product-color-image.dto';
import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  EMPTY_FIELD,
  INVALID_TYPE_ID,
  PRODUCT_DESCRIPTION_TOO_LONG,
  PRODUCT_DESCRIPTION_TOO_SHORT, PRODUCT_FIELD_MUST_BE_STRING, PRODUCT_NAME_TOO_LONG, PRODUCT_NAME_TOO_SHORT,
} from '../../../messages/constants/messages.constants';
import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { Type } from 'class-transformer';

const MIN_LENGTH_DESCRIPTION = 3;
const MAX_LENGTH_DESCRIPTION = 200;
const MIN_LENGTH_NAME = 3;
const MAX_LENGTH_NAME = 25;
export class ProductDto implements IdentifiedModel {
    id?: number;

    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Имя') })
    @IsString({ message: PRODUCT_FIELD_MUST_BE_STRING.replace('$FIELD', 'Имя') })
    @MinLength(MIN_LENGTH_NAME, { message: PRODUCT_NAME_TOO_SHORT })
    @MaxLength(MAX_LENGTH_NAME, { message: PRODUCT_NAME_TOO_LONG })
    name: string;

    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Описание') })
    @IsString({ message: PRODUCT_FIELD_MUST_BE_STRING.replace('$FIELD', 'Описание') })
    @MinLength(MIN_LENGTH_DESCRIPTION, { message: PRODUCT_DESCRIPTION_TOO_SHORT })
    @MaxLength(MAX_LENGTH_DESCRIPTION, { message: PRODUCT_DESCRIPTION_TOO_LONG })
    description: string;

    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Категории') })
    @IsInt({ message: INVALID_TYPE_ID.replace('$TYPE', 'Категории') })
    categoryId: number;

    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Модели') })
    @IsInt({ message: INVALID_TYPE_ID.replace('$TYPE', 'Модели') })
    modelId: number;

    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Материалы') })
    @ArrayMinSize(1, { message: EMPTY_FIELD.replace('$TYPE', 'Материалы') })
    @IsNumber({}, { each: true, message: INVALID_TYPE_ID.replace('$TYPE', 'Материалы') })
    materialIds: number[];

    @ValidateNested({ each: true })
    @Type(() => ProductColorSizeDto)
    @IsNotEmpty({ message: 'Цвета с размерами являются обязательным полем' })
    productColorSizes: ProductColorSizeDto[];

    @ValidateNested({ each: true })
    @Type(() => ProductColorImageDto)
    @IsNotEmpty({ message: 'Цвета и фотографии являются обязательным полем' })
    productColorImages: ProductColorImageDto[];
}