import { Test } from '@nestjs/testing';
import { AuthenticationService } from '../../../../app/service/authentication/impl/authentication.service';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '../../../../app/service/user/user.service.abstraction';
import { UserEntity } from '../../../../app/repository/user/entity/user.entity';

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
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
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
    const testToken = 'ddfesdas123';
    const creds = {
      login: 'test',
      password: 'test',
    };
    const mockUser = { id: 1, name: 'test', login: 'test' } as UserEntity;
    userService.findByLogin = jest.fn(() => Promise.resolve(mockUser));
    jwtService.sign = jest.fn(() => testToken);
    const token = await authenticationService.signIn(creds);
    expect(token.accessToken).toBe(testToken);
  });

  it('should throw error for invalid creds', () => {
    const testToken = 'ddfesdas123';
    const creds = {
      login: 'not valid',
      password: 'test',
    };
    const mockUser = { id: 1, name: 'test', login: 'test' } as UserEntity;
    userService.findByLogin = jest.fn(() => Promise.resolve(mockUser));
    jwtService.sign = jest.fn(() => testToken);
    authenticationService.signIn(creds).catch(error => {
      expect(error).toBeTruthy();
    });
  });
});
