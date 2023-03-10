import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { UserCredentials } from '../../../service/authentication/model/UserCredentials';
import { JwtToken } from '../../../service/authentication/model/JwtToken';
import { IAuthenticationService } from '../../../service/authentication/authentication.service.abstraction';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {

    @Inject()
    private authenticationService: IAuthenticationService;

    @Post('login')
    async login(@Body(new ValidationPipe()) credentials: UserCredentials): Promise<JwtToken> {
      return this.authenticationService.signIn(credentials);
    }

}
