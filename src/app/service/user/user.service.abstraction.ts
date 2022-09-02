
import { UserEntity } from '../../repository/user/entity/user.entity';

export abstract class IUserService {

    public abstract findByLogin(login: string): Promise<UserEntity>;

    public abstract findById(id: number): Promise<UserEntity>;
}
