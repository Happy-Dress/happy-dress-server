import { CredentialsModel } from "./model/credentials.model";
import { Jwt } from "./model/jwt";

export abstract class IAuthenticationService {
  abstract authenticateUser(credentials: CredentialsModel): Jwt;
}
