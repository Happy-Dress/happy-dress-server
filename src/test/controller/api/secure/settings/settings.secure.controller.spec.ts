import {ISettingsService} from "../../../../../app/service/settings/settings.service.abstraction";
import {Test} from "@nestjs/testing";
import {SettingsSecureController} from "../../../../../app/controller/api/secure/settings/settings.secure.controller";

describe('SettingsSecureController', () => {
    let settingsSecureController: SettingsSecureController;
    let settingsService: ISettingsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: ISettingsService,
                    useValue: {
                        getGlobalDressOptions: jest.fn(),
                        setGlobalDressOptions: jest.fn(),
                    },
                },
            ],
            controllers: [SettingsSecureController],
        }).compile();

        settingsService = moduleRef.get<ISettingsService>(ISettingsService);
        settingsSecureController = moduleRef.get<SettingsSecureController>(SettingsSecureController);
    });

    describe('get',  () => {
        it('should get category', async () => {
            const result = {} as any;
            jest.spyOn(settingsService, 'getGlobalDressOptions').mockImplementation(() => result);
            const actualResult = await settingsSecureController.get();
            expect(actualResult).toBe(result);
        });
    });
    describe('set', () => {
        it('should set category', async () => {
            const result = {} as any;
            const settings = {} as any;
            jest.spyOn(settingsService, 'setGlobalDressOptions').mockImplementation(() => result);
            const actualResult = await settingsSecureController.save(settings);
            expect(actualResult).toBe(result);
        });
    });
});