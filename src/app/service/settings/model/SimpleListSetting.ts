import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {
  NAME_TOO_LONG,
  NAME_TOO_SHORT,
  INVALID_NAME_DETECTED,
} from '../../../messages/constants/messages.constants';

const MIN_LENGTH_NAME = 3;
const MAX_LENGTH_NAME = 20;

export class SimpleListSetting {
    id?: number;

    @IsString()
    @MinLength(MIN_LENGTH_NAME, { message: NAME_TOO_SHORT })
    @MaxLength(MAX_LENGTH_NAME, { message: NAME_TOO_LONG })
    @Matches(/^[а-яА-Яa-zA-Z0-9_.,\s\-]+$/, { message: INVALID_NAME_DETECTED })
    name: string;
}
