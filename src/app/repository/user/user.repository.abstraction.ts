import { CredentialsModel } from '../../service/authentication/model/credentials.model';
import { TestUser } from './entity/test-user';

export abstract class IUserRepository {

    public abstract getUserByCredentials(credentials: CredentialsModel): TestUser;

}
