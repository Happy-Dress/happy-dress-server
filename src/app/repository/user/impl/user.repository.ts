import { Injectable } from '@nestjs/common';
import { CredentialsModel } from '../../../service/authentication/model/credentials.model';
import { TestUser } from '../entity/test-user';
import { IUserRepository } from '../user.repository.abstraction';

const MOCK_USER: TestUser = {
    id: 1,
    name: 'test name',
    login: 'test@gmail.com',
    password: '1234',
};

@Injectable()
export class UserRepository implements IUserRepository {

    public getUserByCredentials(credentials: CredentialsModel): TestUser {
        const { login, password } = credentials;
        return { ...MOCK_USER, login, password };
    }
}
