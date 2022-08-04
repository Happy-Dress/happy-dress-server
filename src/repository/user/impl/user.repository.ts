import { Injectable } from '@nestjs/common';
import { CredentialsModel } from '../../../service/authentication/model/credentials.model';
import { UserEntity } from '../entity/user.entity';
import { IUserRepository } from '../user.repository.abstraction';

const MOCK_USER: UserEntity = {
    id: 1,
    name: 'test name',
    login: 'test@gmail.com',
    password: '1234',
};

@Injectable()
export class UserRepository implements IUserRepository {

    public getUserByCredentials(credentials: CredentialsModel): UserEntity {
        const { login, password } = credentials;
        return { ...MOCK_USER, login, password };
    }
}
