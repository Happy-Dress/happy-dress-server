import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserCredentials } from '../../../service/authentication/model/UserCredentials';
import { JwtToken } from '../../../service/authentication/model/JwtToken';
import { IAuthenticationService } from '../../../service/authentication/authentication.service.abstraction';

@Controller('auth')
export class AuthenticationController {

    @Inject()
    private authenticationService: IAuthenticationService;

    @Post('login')
    async login(@Body() credentials: UserCredentials): Promise<JwtToken> {
        return this.authenticationService.signIn(credentials);
    }

}
