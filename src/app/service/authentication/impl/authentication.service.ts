import { IAuthenticationService } from '../authentication.service.abstraction';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCredentials } from '../model/UserCredentials';
import { JwtToken } from '../model/JwtToken';
import { UserEntity } from '../../../repository/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { INVALID_LOGIN_OR_PASSWORD } from '../../../messages/constants/messages.constants';
import { IUserService } from '../../user/user.service.abstraction';
import { UserInfo } from '../model/UserInfo';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthenticationService implements IAuthenticationService {

    @Inject()
    private jwtService: JwtService;

    @Inject()
    private userService: IUserService;

    public async signIn(credentials: UserCredentials): Promise<JwtToken> {
      const user = await this.getUser(credentials);
      const payload = { username: user.name, userId: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    public async getUser(credentials: UserCredentials): Promise<UserEntity> {
      const user = await this.userService.findByLogin(credentials.login);
      const isUserValid = await this.areCredentialsInvalid(credentials, user);
      if (isUserValid) {
        throw new UnauthorizedException(INVALID_LOGIN_OR_PASSWORD);
      }
      return user;
    }

    public async getUserById(id: number): Promise<UserInfo> {
      const user = await this.userService.findById(id);
      if (!user) {
        throw new UnauthorizedException();
      }
      return { id: user.id, username: user.name };
    }

    private async areCredentialsInvalid(credentials: UserCredentials, user: UserEntity): Promise<boolean> {
      return !user || user.login !== credentials.login || ! await this.isPasswordMatching(credentials, user);
    }

    private async isPasswordMatching(credentials: UserCredentials, user: UserEntity): Promise<boolean> {
      return bcrypt.compare(credentials.password, user.password);
    }

}
