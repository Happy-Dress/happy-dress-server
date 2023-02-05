import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {
  INVALID_DESCRIPTION_DETECTED,
  INVALID_TYPE_ID,
  PRODUCT_NAME_TOO_LONG,
  PRODUCT_NAME_TOO_SHORT,
} from '../../../messages/constants/messages.constants';

const MIN_LENGTH_NAME = 3;
const MAX_LENGTH_NAME = 30;

export class UpdateProductDto implements IdentifiedModel {
    id?: number;

    @IsString()
    @MinLength(MIN_LENGTH_NAME, { message: PRODUCT_NAME_TOO_SHORT })
    @MaxLength(MAX_LENGTH_NAME, { message: PRODUCT_NAME_TOO_LONG })
    @Matches(/^[а-яА-Яa-zA-Z0-9_.\s\-]+$/, { message: INVALID_DESCRIPTION_DETECTED })
    name: string;


    @IsNumber({}, { message: INVALID_TYPE_ID })
    categoryId: number;

    @IsNumber({}, { message: INVALID_TYPE_ID })
    modelId: number;

    materialIds: number[];
}