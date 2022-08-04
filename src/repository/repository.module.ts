import { Module } from "@nestjs/common";
import { UserRepository } from "./user/impl/user.repository";
import { IUserRepository } from "./user/user.repository.abstraction";

@Module({
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository
    }
  ],
  exports: [IUserRepository]
})
export class RepositoryModule {}
