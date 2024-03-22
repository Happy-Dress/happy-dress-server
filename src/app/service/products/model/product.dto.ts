import { ProductColorSizeDto } from './product-color-size.dto';
import { ProductColorImageDto } from './product-color-image.dto';
import {
  ArrayMinSize, ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString, Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  EMPTY_FIELD, FIELD_MUST_BE_STRING, INVALID_GOOGLE_DRIVE_LINK, INVALID_PRODUCT_DESCRIPTION, INVALID_PRODUCT_NAME,
  INVALID_TYPE_ID,
  PRODUCT_DESCRIPTION_TOO_LONG,
  PRODUCT_DESCRIPTION_TOO_SHORT, PRODUCT_NAME_TOO_LONG, PRODUCT_NAME_TOO_SHORT,
} from '../../../messages/constants/messages.constants';
import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const MIN_LENGTH_DESCRIPTION = 3;
const MAX_LENGTH_DESCRIPTION = 200;
const MIN_LENGTH_NAME = 3;
const MAX_LENGTH_NAME = 25;
export class ProductDto implements IdentifiedModel {
    @ApiPropertyOptional()
    id?: number;

    @ApiProperty()
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Имя') })
    @IsString({ message: FIELD_MUST_BE_STRING.replace('$FIELD', 'Имя') })
    @MinLength(MIN_LENGTH_NAME, { message: PRODUCT_NAME_TOO_SHORT })
    @MaxLength(MAX_LENGTH_NAME, { message: PRODUCT_NAME_TOO_LONG })
    //@Matches(/^(?!\s+$)[a-zA-Z0-9а-яА-ЯёЁ—: ]*$/, { message: INVALID_PRODUCT_NAME })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Описание') })
    @IsString({ message: FIELD_MUST_BE_STRING.replace('$FIELD', 'Описание') })
    @MinLength(MIN_LENGTH_DESCRIPTION, { message: PRODUCT_DESCRIPTION_TOO_SHORT })
    @MaxLength(MAX_LENGTH_DESCRIPTION, { message: PRODUCT_DESCRIPTION_TOO_LONG })
    //@Matches(/^(?=.*[^ ]).+$/, { message: INVALID_PRODUCT_DESCRIPTION })
    description: string;

    @ApiProperty()
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Главное фото') })
    @IsString()
    @Matches(/https:\/\/storage.googleapis.com\/happy-dress-prod/, { message: INVALID_GOOGLE_DRIVE_LINK })
    mainImageUrl: string;

    @ApiProperty()
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Категории') })
    @IsInt({ message: INVALID_TYPE_ID.replace('$TYPE', 'Категории') })
    categoryId: number;

    @ApiProperty()
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Модели') })
    @IsInt({ message: INVALID_TYPE_ID.replace('$TYPE', 'Модели') })
    modelId: number;

    @ApiProperty({ type: [Number] })
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Материалы') })
    @ArrayMinSize(1, { message: EMPTY_FIELD.replace('$TYPE', 'Материалы') })
    @IsNumber({}, { each: true, message: INVALID_TYPE_ID.replace('$TYPE', 'Материалы') })
    materialIds: number[];

    @ApiProperty({ type: [ProductColorImageDto] })
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'productColorImages') })
    @ArrayNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'productColorImages') })
    @ValidateNested({ each: true })
    @Type(() => ProductColorImageDto)
    @IsNotEmpty({ message: 'Цвета и фотографии являются обязательным полем' })
    productColorImages: ProductColorImageDto[];

    @ApiProperty({ type: [ProductColorImageDto] })
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'productColorSize') })
    @ArrayNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'productColorSize') })
    @ValidateNested({ each: true })
    @Type(() => ProductColorSizeDto)
    @IsNotEmpty({ message: 'Цвета с размерами являются обязательным полем' })
    productColorSizes: ProductColorSizeDto[];
}
