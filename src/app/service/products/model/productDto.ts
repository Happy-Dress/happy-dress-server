import { IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { ModelDto } from '../../settings/model/model.dto';
import { CategoryDto } from '../../settings/model/category.dto';
import { MaterialDto } from '../../settings/model/material.dto';
import {
  INVALID_DESCRIPTION_DETECTED, INVALID_TYPE_ID,
  PRODUCT_NAME_TOO_LONG,
  PRODUCT_NAME_TOO_SHORT,
} from '../../../messages/constants/messages.constants';

const MIN_LENGTH_NAME = 3;
const MAX_LENGTH_NAME = 30;

export class ProductDto implements IdentifiedModel {
    @IsNumber({}, { message: INVALID_TYPE_ID })
    id?: number;
    
    @IsString()
    @MinLength(MIN_LENGTH_NAME, { message: PRODUCT_NAME_TOO_SHORT })
    @MaxLength(MAX_LENGTH_NAME, { message: PRODUCT_NAME_TOO_LONG })
    @Matches(/^[а-яА-Яa-zA-Z0-9_.\s\-]+$/, { message: INVALID_DESCRIPTION_DETECTED })
    name: string;
    
    category: CategoryDto;

    @IsNumber({}, { message: INVALID_TYPE_ID })
    categoryId: number;
    
    model: ModelDto;

    @IsNumber({}, { message: INVALID_TYPE_ID })
    modelId: number;
    
    materials: MaterialDto[];
}