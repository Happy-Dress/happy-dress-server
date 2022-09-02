import { UserCredentials } from './model/UserCredentials';
import { JwtToken } from './model/JwtToken';
import { UserEntity } from '../../repository/user/entity/user.entity';
import { UserInfo } from './model/UserInfo';

export abstract class IAuthenticationService {

    abstract getUser(credentials: UserCredentials): Promise<UserEntity>;

    abstract signIn(credentials: UserCredentials): Promise<JwtToken>;

    abstract getUserById(id: number): Promise<UserInfo>;
}
