import { Injectable } from '@nestjs/common';
import { CredentialsModel } from '../model/credentials.model';
import { UserEntity } from '../../../repository/user/entity/user.entity';
import { sign } from 'jsonwebtoken';
import { Jwt } from '../model/jwt';
import { IAuthenticationService } from '../authentication.service.abstraction';
import { IUserRepository } from '../../../repository/user/user.repository.abstraction';

@Injectable()
export class AuthenticationService implements IAuthenticationService {

    constructor(private readonly userRepository: IUserRepository) {}

    public authenticateUser(credentials: CredentialsModel): Jwt {
        const user: UserEntity = this.userRepository.getUserByCredentials(credentials);
        const token = sign({ 'username': user.name }, 'secret', { expiresIn: '1d' });
        return {
            token,
        };
    }
}
