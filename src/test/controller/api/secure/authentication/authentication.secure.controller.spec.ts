import {IAuthenticationService} from "../../../../../app/service/authentication/authentication.service.abstraction";
import {
    AuthenticationSecureController
} from "../../../../../app/controller/api/secure/authentication/authentication.secure.controller";
import {Test} from "@nestjs/testing";

describe('AuthenticationSecureController', () => {
    let authenticationSecureController: AuthenticationSecureController;
    let authenticationService: IAuthenticationService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: IAuthenticationService,
                    useValue: {
                        refreshToken: jest.fn(),
                    },
                },
            ],
            controllers: [AuthenticationSecureController],
        }).compile();

        authenticationService = moduleRef.get<IAuthenticationService>(IAuthenticationService);
        authenticationSecureController = moduleRef.get<AuthenticationSecureController>(AuthenticationSecureController);
    });

    it('should return new tokens by refresh token', async () => {
        const reqBody = {
            refreshToken: '121dsdsfw12fsf21'
        };
        const token = {
            accessToken: '121dsdsfw12fsf21',
            refreshToken: reqBody.refreshToken,
        }
        jest.spyOn(authenticationService, 'refreshToken').mockImplementation(() => Promise.resolve(token));
        const actualResponse = await authenticationSecureController.refresh(reqBody);
        expect(actualResponse).toBe(token);
    });

});
