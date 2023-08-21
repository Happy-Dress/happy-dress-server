import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthenticationService } from '../../../service/authentication/authentication.service.abstraction';
import { UserInfo } from '../../../service/authentication/model/UserInfo';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh'
) {
    
    @Inject()
    private authenticationService: IAuthenticationService;

    constructor(private configService: ConfigService) {
        super({
          jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
          ignoreExpiration: false,
          secretOrKey: configService.get<string>('JWT_REFRESH_SECRET_KEY'),
        });
    }

    public async validate(payload: { id: number }): Promise<UserInfo> {
      return this.authenticationService.getUserById(payload.id);
    }
}