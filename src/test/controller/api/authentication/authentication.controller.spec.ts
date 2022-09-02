import { Test } from '@nestjs/testing';
import { AuthenticationController } from '../../../../app/controller/api/authentication/authentication.controller';
import { IAuthenticationService } from '../../../../app/service/authentication/authentication.service.abstraction';
import { UserCredentials } from '../../../../app/service/authentication/model/UserCredentials';

describe('AuthenticationController', () => {
    let authenticationController: AuthenticationController;
    let authenticationService: IAuthenticationService;

  beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
          providers: [
              {
                  provide: IAuthenticationService,
                  useValue: {
                      signIn: jest.fn(),
                  },
              },
          ],
          controllers: [AuthenticationController],
      }).compile();

      authenticationService = moduleRef.get<IAuthenticationService>(IAuthenticationService);
      authenticationController = moduleRef.get<AuthenticationController>(AuthenticationController);
  });

  describe('sign in',  () => {
    it('should sign in user', async () => {
        const creds = {
            login: 'test',
            password: 'test',
        } as UserCredentials;
        const token = {
            accessToken: '121dsdsfw12fsf21',
        };
        jest.spyOn(authenticationService, 'signIn').mockImplementation(() => Promise.resolve(token));
        const actualResponse = await authenticationController.login(creds);
        expect(actualResponse).toBe(token);
    });
  });
});
