import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Inject, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { IAuthenticationService } from '../../../../service/authentication/authentication.service.abstraction';
import { JwtToken } from '../../../../service/authentication/model/JwtToken';
import { JwtRefreshAuthGuard } from '../../../security/guards/jwt.refresh.auth.guard';
import { RefreshToken } from '../../../../service/authentication/model/RefreshToken';

@ApiTags('secure_authentication')
@Controller('secure/auth')
export class AuthenticationSecureController {

    @Inject()
    private authenticationService: IAuthenticationService;

    @UseGuards(JwtRefreshAuthGuard)
    @Post('refresh')
    async refresh(@Body(new ValidationPipe()) body: RefreshToken): Promise<JwtToken> {
      return this.authenticationService.refreshToken(body.refreshToken);
    }
}