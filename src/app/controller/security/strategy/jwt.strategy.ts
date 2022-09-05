import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { IAuthenticationService } from '../../../service/authentication/authentication.service.abstraction';
import { UserInfo } from '../../../service/authentication/model/UserInfo';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    @Inject()
    private authenticationService: IAuthenticationService;

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    public async validate(payload: { id: number }): Promise<UserInfo> {
        return this.authenticationService.getUserById(payload.id);
    }

}
