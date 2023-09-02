import { Test } from '@nestjs/testing';
import { AuthenticationService } from '../../../../app/service/authentication/impl/authentication.service';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '../../../../app/service/user/user.service.abstraction';
import { UserEntity } from '../../../../app/repository/user/entity/user.entity';
import {ConfigService} from "@nestjs/config";
import {UserInfo} from "../../../../app/service/authentication/model/UserInfo";

jest.mock('bcrypt', () => {
  return { compare: jest.fn(() => true) };
});

describe('AuthenticationService', () => {

  let authenticationService: AuthenticationService;
  let userService: IUserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        ConfigService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            decode: jest.fn(),
          },
        },
        {
          provide: IUserService,
          useValue: {
            findByLogin: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    authenticationService = moduleRef.get<AuthenticationService>(AuthenticationService);
    userService = moduleRef.get<IUserService>(IUserService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it('should sign in', async () => {
    const jwtToken = {
      accessToken: 'ddfesdas123',
      refreshToken: 'ddfesdas123',
    };
    const creds = {
      login: 'test',
      password: 'test',
    };
    const mockUser = { id: 1, name: 'test', login: 'test' } as UserEntity;
    userService.findByLogin = jest.fn(() => Promise.resolve(mockUser));
    jwtService.signAsync = jest.fn()
        .mockImplementationOnce(() => jwtToken.accessToken)
        .mockImplementationOnce(() => jwtToken.refreshToken);
    const token = await authenticationService.signIn(creds);
    expect(token).toStrictEqual(jwtToken);
  });

  it('should throw error for invalid creds', () => {
    const jwtToken = {
      accessToken: 'ddfesdas123',
      refreshToken: 'ddfesdas123',
    };
    const creds = {
      login: 'not valid',
      password: 'test',
    };
    const mockUser = { id: 1, name: 'test', login: 'test' } as UserEntity;
    userService.findByLogin = jest.fn(() => Promise.resolve(mockUser));
    jwtService.signAsync = jest.fn()
        .mockImplementationOnce(() => jwtToken.accessToken)
        .mockImplementationOnce(() => jwtToken.refreshToken);
    authenticationService.signIn(creds).catch(error => {
      expect(error).toBeTruthy();
    });
  });

  it('should refresh token', async () => {
    const jwtToken = {
      accessToken: 'ddfesdas123',
      refreshToken: 'ddfesdas123',
    };
    const refreshToken = 'ddfesdas123';
    const mockUser = { id: 1, name: 'test', login: 'test' } as UserEntity;
    const mockDecode = { id: 1, username: 'test'} as UserInfo;
    userService.findById = jest.fn(() => Promise.resolve(mockUser));
    jwtService.decode = jest.fn(() => mockDecode);
    jwtService.signAsync = jest.fn()
        .mockImplementationOnce(() => jwtToken.accessToken)
        .mockImplementationOnce(() => jwtToken.refreshToken);
    const token = await authenticationService.refreshToken(refreshToken);
    expect(token).toStrictEqual(jwtToken);
  });

});
