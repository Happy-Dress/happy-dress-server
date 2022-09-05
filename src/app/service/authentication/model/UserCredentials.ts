import { MaxLength, MinLength, IsString, Matches } from 'class-validator';
import { INVALID_LOGIN_FORMAT, INVALID_PASSWORD_FORMAT } from '../../../messages/constants/messages.constants';

const MIN_LENGTH = 4;
const LOGIN_MAX_LENGTH = 35;
const PASSWORD_MAX_LENGTH = 15;

export class UserCredentials {
    @IsString()
    @MinLength(MIN_LENGTH)
    @MaxLength(LOGIN_MAX_LENGTH)
    @Matches(/^[a-z0-9_.]+$/, { message: INVALID_LOGIN_FORMAT })
    login: string;

    @IsString()
    @MinLength(MIN_LENGTH)
    @MaxLength(PASSWORD_MAX_LENGTH)
    @Matches(/[\w\[\]`?!&/.,”']*/, { message: INVALID_PASSWORD_FORMAT })
    password: string;
}
