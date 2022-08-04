import { Body, Controller, Post } from "@nestjs/common";
import { CredentialsModel } from "../../service/authentication/model/credentials.model";
import { Jwt } from "../../service/authentication/model/jwt";
import { IAuthenticationService } from "../../service/authentication/authentication.service.abstraction";

@Controller('authentication')
export class AuthenticationController {

  constructor(private readonly authenticationService: IAuthenticationService) {}

  @Post()
  authenticate(@Body() credentials: CredentialsModel): Jwt {
    return this.authenticationService.authenticateUser(credentials);
  }
}
