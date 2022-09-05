import { MaxLength, MinLength, IsString, Matches } from 'class-validator';
import { INVALID_PASSWORD_FORMAT } from '../../../messages/constants/messages.constants';

const MIN_LENGTH = 4;
const MAX_LENGTH = 20;

export class UserCredentials {
    @IsString()
    @MinLength(MIN_LENGTH)
    @MaxLength(MAX_LENGTH)
    login: string;

    @IsString()
    @MinLength(MIN_LENGTH)
    @MaxLength(MAX_LENGTH)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: INVALID_PASSWORD_FORMAT })
    password: string;
}
