import { Test } from '@nestjs/testing';
import { SettingsController } from '../../../../app/controller/api/settings/settings.controller';
import { ISettingsService } from '../../../../app/service/settings/settings.service.abstraction';

describe('SettingsController', () => {
  let settingsController: SettingsController;
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
        controllers: [SettingsController],
      }).compile();

      settingsService = moduleRef.get<ISettingsService>(ISettingsService);
      settingsController = moduleRef.get<SettingsController>(SettingsController);
    });

    describe('get',  () => {
        it('should get category', async () => {
          const result = {} as any;
            jest.spyOn(settingsService, 'getGlobalDressOptions').mockImplementation(() => result);
            const actualResult = await settingsController.get();
            expect(actualResult).toBe(result);
        });
    });
    describe('set', () => {
        it('should set category', async () => {
          const result = {} as any;
          const settings = {} as any;
            jest.spyOn(settingsService, 'setGlobalDressOptions').mockImplementation(() => result);
            const actualResult = await settingsController.save(settings);
            expect(actualResult).toBe(result);
        });
    });
});