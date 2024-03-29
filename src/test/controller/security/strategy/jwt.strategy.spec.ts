import { IAuthenticationService } from '../../../../app/service/authentication/authentication.service.abstraction';
import { Test } from '@nestjs/testing';
import { JwtAccessStrategy } from '../../../../app/controller/security/strategy/jwt.access.strategy';
import { ConfigService } from '@nestjs/config';

jest.mock('passport-jwt', () => {
  const mJWTStrategy = jest.fn();
  const mExtractJwt = {
    fromAuthHeaderAsBearerToken: jest.fn(),
  };
  return { Strategy: mJWTStrategy, ExtractJwt: mExtractJwt };
});

jest.mock('passport', () => {
  return { use: jest.fn() };
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtAccessStrategy;
  let authenticationService: IAuthenticationService;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          {
            provide: IAuthenticationService,
            useValue: {
              getUserById: jest.fn(),
            },
          },
          {
            provide: ConfigService,
            useValue: {
              get: jest.fn(),
            },
          },
          JwtAccessStrategy,
        ],
      }).compile();

      authenticationService = moduleRef.get<IAuthenticationService>(IAuthenticationService);
      jwtStrategy = moduleRef.get<JwtAccessStrategy>(JwtAccessStrategy);
    });

    it('should validate', async () => {
      const testId = 123;
      await jwtStrategy.validate({ id: testId });
        expect(authenticationService.getUserById).toHaveBeenCalledWith(testId);
    });
});
