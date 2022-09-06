import { MaxLength, MinLength, IsString, Matches } from 'class-validator';
import {
  INVALID_LOGIN_FORMAT,
  INVALID_PASSWORD_FORMAT, LOGIN_TOO_LONG,
  LOGIN_TOO_SHORT, PASSWORD_TOO_LONG, PASSWORD_TOO_SHORT,
} from '../../../messages/constants/messages.constants';

export const CREDS_MIN_LENGTH = 4;
export const LOGIN_MAX_LENGTH = 35;
export const PASSWORD_MAX_LENGTH = 15;

export class UserCredentials {
    @IsString()
    @MinLength(CREDS_MIN_LENGTH, { message: LOGIN_TOO_SHORT })
    @MaxLength(LOGIN_MAX_LENGTH, { message: LOGIN_TOO_LONG })
    @Matches(/^[a-z0-9_.]+$/, { message: INVALID_LOGIN_FORMAT })
    login: string;

    @IsString()
    @MinLength(CREDS_MIN_LENGTH, { message: PASSWORD_TOO_SHORT })
    @MaxLength(PASSWORD_MAX_LENGTH, { message: PASSWORD_TOO_LONG })
    @Matches(/[\w\[\]`?!&/.,”']*/, { message: INVALID_PASSWORD_FORMAT })
    password: string;
}
