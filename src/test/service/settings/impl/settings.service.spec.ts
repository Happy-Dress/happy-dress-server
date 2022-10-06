import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../../test-utils/test-utils';
import {CategoryEntity} from "../../../../app/repository/settings/category/entity/category.entity";
import {SettingsService} from "../../../../app/service/settings/impl/settings.service";
import {ModelEntity} from "../../../../app/repository/settings/model/entity/model.entity";
import {SimpleListSettingConverter} from "../../../../app/service/settings/util/simpleListSetting.converter";
import {SimpleListSetting} from "../../../../app/service/settings/model/SimpleListSetting";

describe('SettingsService', () => {

    let categoryRepository: Repository<CategoryEntity>;
    let modelRepository: Repository<ModelEntity>;
    let settingsService: SettingsService;


    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                SettingsService,
                SimpleListSettingConverter,
                { provide: getRepositoryToken(CategoryEntity), useFactory: repositoryMockFactory },
                { provide: getRepositoryToken(ModelEntity), useFactory: repositoryMockFactory }
            ],
        }).compile();

        settingsService = moduleRef.get<SettingsService>(SettingsService);
        categoryRepository = moduleRef.get(getRepositoryToken(CategoryEntity));
        modelRepository = moduleRef.get(getRepositoryToken(ModelEntity));
    });

    it('should find all categories', async () => {
        const mockCategories = [] as SimpleListSetting[];
        const mockModels = [] as SimpleListSetting[];
        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        const globalDressOptions = await settingsService.getGlobalDressOptions();
        expect(globalDressOptions.categories).toStrictEqual(mockCategories);
    });

    it('should find all models', async () => {
        const mockCategories = [] as SimpleListSetting[];
        const mockModels = [] as SimpleListSetting[];
        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        const globalDressOptions = await settingsService.getGlobalDressOptions();
        expect(globalDressOptions.models).toStrictEqual(mockModels);
    });

    it('should set all categories', async () => {
        const mockCategories = [] as SimpleListSetting[];
        const mockModels = [] as SimpleListSetting[];

        categoryRepository.clear = jest.fn(() => []) as any;
        modelRepository.clear = jest.fn(() => []) as any;

        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;

        categoryRepository.insert = jest.fn(() => []) as any;
        modelRepository.insert = jest.fn(() => []) as any;

        const globalDressOptions = await settingsService.setGlobalDressOptions({
            categories: mockCategories, models: mockModels
        });
        expect(globalDressOptions.categories).toStrictEqual(mockCategories);
    });


    it('should set all models', async () => {
        const mockCategories = [] as SimpleListSetting[];
        const mockModels = [] as SimpleListSetting[];

        categoryRepository.clear = jest.fn(() => []) as any;
        modelRepository.clear = jest.fn(() => []) as any;

        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;

        categoryRepository.insert = jest.fn(() => []) as any;
        modelRepository.insert = jest.fn(() => []) as any;

        const globalDressOptions = await settingsService.setGlobalDressOptions({
            categories: mockCategories, models: mockModels
        });
        expect(globalDressOptions.models).toStrictEqual(mockModels);
    });

});