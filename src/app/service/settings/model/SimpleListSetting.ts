import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {
  CATEGORY_TOO_LONG,
  CATEGORY_TOO_SHORT,
  INVALID_DESCRIPTION_DETECTED,
} from '../../../messages/constants/messages.constants';

const MIN_LENGTH_CATEGORY = 3;
const MAX_LENGTH_CATEGORY = 20;

export class SimpleListSetting {
    id?: number;

    @IsString()
    @MinLength(MIN_LENGTH_CATEGORY, { message: CATEGORY_TOO_SHORT })
    @MaxLength(MAX_LENGTH_CATEGORY, { message: CATEGORY_TOO_LONG })
    @Matches(/^[а-яА-Яa-zA-Z0-9_.]+$/, { message: INVALID_DESCRIPTION_DETECTED })
    description: string;
}
