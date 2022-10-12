import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../../test-utils/test-utils';
import {CategoryEntity} from "../../../../app/repository/settings/category/entity/category.entity";
import {SettingsService} from "../../../../app/service/settings/impl/settings.service";
import {ModelEntity} from "../../../../app/repository/settings/model/entity/model.entity";
import {SimpleListSettingConverter} from "../../../../app/service/settings/util/simpleListSetting.converter";
import {SimpleListSetting} from "../../../../app/service/settings/model/SimpleListSetting";
import {CategoryDTO} from "../../../../app/service/settings/model/CategoryDTO";
import {CategoryConverter} from "../../../../app/service/settings/util/category.converter";
import {BadRequestException} from "@nestjs/common";
import {INVALID_ID_TO_UPDATE} from "../../../../app/messages/constants/messages.constants";

jest.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({}),
}))

describe('SettingsService', () => {

    const error = new BadRequestException(INVALID_ID_TO_UPDATE);

    let categoryRepository: Repository<CategoryEntity>;
    let modelRepository: Repository<ModelEntity>;
    let settingsService: SettingsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                SettingsService,
                SimpleListSettingConverter,
                CategoryConverter,
                { provide: getRepositoryToken(CategoryEntity), useFactory: repositoryMockFactory },
                { provide: getRepositoryToken(ModelEntity), useFactory: repositoryMockFactory }
            ],

        }).compile();

        settingsService = moduleRef.get<SettingsService>(SettingsService);
        categoryRepository = moduleRef.get(getRepositoryToken(CategoryEntity));
        modelRepository = moduleRef.get(getRepositoryToken(ModelEntity));
        jest.mock('typeorm-transactional', () => ({
            Transactional: () => () => ({}),
        }))
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
        const mockCategories = [] as CategoryDTO[];
        const mockModels = [] as SimpleListSetting[];
        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        const globalDressOptions = await settingsService.getGlobalDressOptions();
        expect(globalDressOptions.models).toStrictEqual(mockModels);
    });

    it('should update all categories', async () => {
        const mockCategories = [] as CategoryDTO[];
        const mockModels = [] as SimpleListSetting[];


        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;

        categoryRepository.save = jest.fn(() => []) as any;
        modelRepository.save = jest.fn(() => []) as any;

        const globalDressOptions = await settingsService.setGlobalDressOptions({
            categories: mockCategories, models: mockModels
        });
        expect(globalDressOptions.categories).toStrictEqual(mockCategories);
    });


    it('should update all models', async () => {
        const mockCategories = [] as CategoryDTO[];
        const mockModels = [] as SimpleListSetting[];

        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;

        categoryRepository.save = jest.fn(() => []) as any;
        modelRepository.save = jest.fn(() => []) as any;

        const globalDressOptions = await settingsService.setGlobalDressOptions({
            categories: mockCategories, models: mockModels
        });
        expect(globalDressOptions.models).toStrictEqual(mockModels);
    });

    it('should delete old id', async () => {
        const mockCategories = [{id: 1}] as CategoryDTO[];
        const mockModels = [{id: 1}] as SimpleListSetting[];
        const newCategories = [] as CategoryDTO[];
        const newModels = [] as SimpleListSetting[];

        categoryRepository.find = jest.fn()
            .mockReturnValueOnce(mockCategories)
            .mockReturnValueOnce(newCategories);
        modelRepository.find = jest.fn()
            .mockReturnValueOnce(mockModels)
            .mockReturnValueOnce(newModels);

        categoryRepository.save = jest.fn(() => []) as any;
        modelRepository.save = jest.fn(() => []) as any;

        categoryRepository.delete = jest.fn(() => []) as any;
        modelRepository.delete = jest.fn( () => []) as any;

        const globalDressOptions = await settingsService.setGlobalDressOptions({
            categories: newCategories, models: newModels
        });
        expect(globalDressOptions.categories).toStrictEqual(newCategories);
        expect(globalDressOptions.models).toStrictEqual(newModels);
    });

    it('should throw error of invalid id', async () => {
        const mockCategories = [{id: 1}] as CategoryDTO[];
        const mockModels = [{id: 1}] as SimpleListSetting[];
        const newCategories = [{id : 2}] as CategoryDTO[];
        const newModels = [{id : 2}] as SimpleListSetting[];

        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;

        await expect( () => settingsService.setGlobalDressOptions({
            categories: newCategories, models: newModels
        })).rejects.toThrowError(error);
    });

});