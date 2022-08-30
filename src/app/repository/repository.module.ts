import { Module } from '@nestjs/common';
import { UserRepository } from './user/impl/user.repository';
import { IUserRepository } from './user/user.repository.abstraction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
    ],
    exports: [IUserRepository],
})
export class RepositoryModule {}
