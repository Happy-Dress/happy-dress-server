import { CredentialsModel } from "../../service/authentication/model/credentials.model";
import { UserEntity } from "./entity/user.entity";

export abstract class IUserRepository {
  abstract getUserByCredentials(credentials: CredentialsModel): UserEntity;

}
