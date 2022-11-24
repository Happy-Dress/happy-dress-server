import { SimpleListSetting } from './SimpleListSetting';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {
  DESCRIPTION_TOO_LONG,
  DESCRIPTION_TOO_SHORT,
  INVALID_DESCRIPTION_DETECTED,
} from '../../../messages/constants/messages.constants';

const MIN_LENGTH_DESCRIPTION = 3;
const MAX_LENGTH_DESCRIPTION = 100;

export class CategoryDTO extends SimpleListSetting {
    @IsString()
    @MinLength(MIN_LENGTH_DESCRIPTION, { message: DESCRIPTION_TOO_SHORT })
    @MaxLength(MAX_LENGTH_DESCRIPTION, { message: DESCRIPTION_TOO_LONG })
    @Matches(/^[а-яА-Яa-zA-Z0-9_.\s\-]+$/, { message: INVALID_DESCRIPTION_DETECTED })
    description: string;

    @IsString()
    imageUrl: string;
}
