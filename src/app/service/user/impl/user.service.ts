import { Injectable } from '@nestjs/common';
import { IUserService } from '../user.service.abstraction';
import { UserEntity } from '../../../repository/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements IUserService {

    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>;

    public findByLogin(login: string): Promise<UserEntity> {
        return this.usersRepository.findOneBy({ login });
    }

    findById(id: number): Promise<UserEntity> {
        return this.usersRepository.findOneBy({ id });
    }


}
