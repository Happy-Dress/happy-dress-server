import { Injectable } from '@nestjs/common';
import { CredentialsModel } from '../model/credentials.model';
import { TestUser } from '../../../repository/user/entity/test-user';
import { sign } from 'jsonwebtoken';
import { Jwt } from '../model/jwt';
import { IAuthenticationService } from '../authentication.service.abstraction';
import { IUserRepository } from '../../../repository/user/user.repository.abstraction';

@Injectable()
export class AuthenticationService implements IAuthenticationService {

    constructor(private readonly userRepository: IUserRepository) {}

    public authenticateUser(credentials: CredentialsModel): Jwt {
        const user: TestUser = this.userRepository.getUserByCredentials(credentials);
        const token = sign({ 'username': user.name }, 'secret', { expiresIn: '1d' });
        return {
            token,
        };
    }
}
