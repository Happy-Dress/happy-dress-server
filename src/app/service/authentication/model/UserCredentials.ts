import { IsNotEmpty } from 'class-validator';

export class UserCredentials {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;
}
