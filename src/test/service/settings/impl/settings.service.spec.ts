import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../../test-utils/test-utils';
import {CategoryEntity} from "../../../../app/repository/settings/category/entity/category.entity";
import {SettingsService} from "../../../../app/service/settings/impl/settings.service";
import {ModelEntity} from "../../../../app/repository/settings/model/entity/model.entity";
import {SimpleListSettingConverter} from "../../../../app/service/settings/util/converters/simple.list.setting.converter";
import {SimpleListSetting} from "../../../../app/service/settings/model/SimpleListSetting";
import {CategoryDTO} from "../../../../app/service/settings/model/CategoryDTO";
import {CategoryConverter} from "../../../../app/service/settings/util/converters/category.converter";
import {EntitiesNotFoundByIds} from "../../../../app/service/settings/exception/entities-not-found-by.ids";
import {ColorDTO} from "../../../../app/service/settings/model/ColorDTO";
import {MaterialEntity} from "../../../../app/repository/settings/material/entity/material.entity";
import {ColorEntity} from "../../../../app/repository/settings/color/entity/color.entity";
import {ColorConverter} from "../../../../app/service/settings/util/converters/color.converter";

jest.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({}),
}))

describe('SettingsService', () => {

    const error = new EntitiesNotFoundByIds('Категории', [2]);

    let categoryRepository: Repository<CategoryEntity>;
    let modelRepository: Repository<ModelEntity>;
    let materialRepository: Repository<MaterialEntity>;
    let colorRepository: Repository<ColorEntity>;
    let settingsService: SettingsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                SettingsService,
                SimpleListSettingConverter,
                CategoryConverter,
                ColorConverter,
                { provide: getRepositoryToken(CategoryEntity), useFactory: repositoryMockFactory },
                { provide: getRepositoryToken(ModelEntity), useFactory: repositoryMockFactory },
                { provide: getRepositoryToken(MaterialEntity), useFactory: repositoryMockFactory},
                { provide: getRepositoryToken(ColorEntity), useFactory: repositoryMockFactory}
            ],

        }).compile();

        settingsService = moduleRef.get<SettingsService>(SettingsService);
        categoryRepository = moduleRef.get(getRepositoryToken(CategoryEntity));
        modelRepository = moduleRef.get(getRepositoryToken(ModelEntity));
        materialRepository = moduleRef.get(getRepositoryToken(MaterialEntity));
        colorRepository = moduleRef.get(getRepositoryToken(ColorEntity));

        jest.mock('typeorm-transactional', () => ({
            Transactional: () => () => ({}),
        }))
    });

    it('should find all categories', async () => {
        const mockCategories = [] as SimpleListSetting[];
        const mockModels = [] as SimpleListSetting[];
        const mockMaterials = [] as SimpleListSetting[];
        const mockColors = [] as ColorDTO[];
        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        materialRepository.find = jest.fn(() => mockMaterials) as any;
        colorRepository.find = jest.fn(() => mockColors) as any;
        const globalDressOptions = await settingsService.getGlobalDressOptions();
        expect(globalDressOptions.categories).toStrictEqual(mockCategories);
    });

    it('should find all models', async () => {
        const mockCategories = [] as SimpleListSetting[];
        const mockModels = [] as SimpleListSetting[];
        const mockMaterials = [] as SimpleListSetting[];
        const mockColors = [] as ColorDTO[];
        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        materialRepository.find = jest.fn(() => mockMaterials) as any;
        colorRepository.find = jest.fn(() => mockColors) as any;
        const globalDressOptions = await settingsService.getGlobalDressOptions();
        expect(globalDressOptions.models).toStrictEqual(mockModels);
    });

    it('should find all materials', async () => {
        const mockCategories = [] as SimpleListSetting[];
        const mockModels = [] as SimpleListSetting[];
        const mockMaterials = [] as SimpleListSetting[];
        const mockColors = [] as ColorDTO[];
        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        materialRepository.find = jest.fn(() => mockMaterials) as any;
        colorRepository.find = jest.fn(() => mockColors) as any;
        const globalDressOptions = await settingsService.getGlobalDressOptions();
        expect(globalDressOptions.materials).toStrictEqual(mockMaterials);
    });

    it('should find all colors', async () => {
        const mockCategories = [] as SimpleListSetting[];
        const mockModels = [] as SimpleListSetting[];
        const mockMaterials = [] as SimpleListSetting[];
        const mockColors = [] as ColorDTO[];
        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        materialRepository.find = jest.fn(() => mockMaterials) as any;
        colorRepository.find = jest.fn(() => mockColors) as any;
        const globalDressOptions = await settingsService.getGlobalDressOptions();
        expect(globalDressOptions.colors).toStrictEqual(mockColors);
    });



    it('should update all categories', async () => {
        const mockCategories = [] as CategoryDTO[];
        const mockModels = [] as SimpleListSetting[];
        const mockMaterials = [] as SimpleListSetting[];
        const mockColors = [] as ColorDTO[];

        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        materialRepository.find = jest.fn(() => mockMaterials) as any;
        colorRepository.find = jest.fn(() => mockColors) as any;

        categoryRepository.save = jest.fn(() => []) as any;
        modelRepository.save = jest.fn(() => []) as any;
        materialRepository.save = jest.fn(() => []) as any;
        colorRepository.save = jest.fn(() => []) as any;

        const globalDressOptions = await settingsService.setGlobalDressOptions({
            categories: mockCategories, models: mockModels, materials: mockMaterials, colors: mockColors,
        });
        expect(globalDressOptions.categories).toStrictEqual(mockCategories);
    });

    it('should update all models', async () => {
        const mockCategories = [] as CategoryDTO[];
        const mockModels = [] as SimpleListSetting[];
        const mockMaterials = [] as SimpleListSetting[];
        const mockColors = [] as ColorDTO[];

        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        materialRepository.find = jest.fn(() => mockMaterials) as any;
        colorRepository.find = jest.fn(() => mockColors) as any;

        categoryRepository.save = jest.fn(() => []) as any;
        modelRepository.save = jest.fn(() => []) as any;
        materialRepository.save = jest.fn(() => []) as any;
        colorRepository.save = jest.fn(() => []) as any;

        const globalDressOptions = await settingsService.setGlobalDressOptions({
            categories: mockCategories, models: mockModels, materials: mockMaterials, colors: mockColors,
        });
        expect(globalDressOptions.models).toStrictEqual(mockModels);
    });

    it('should update all materials', async () => {
        const mockCategories = [] as CategoryDTO[];
        const mockModels = [] as SimpleListSetting[];
        const mockMaterials = [] as SimpleListSetting[];
        const mockColors = [] as ColorDTO[];

        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        materialRepository.find = jest.fn(() => mockMaterials) as any;
        colorRepository.find = jest.fn(() => mockColors) as any;

        categoryRepository.save = jest.fn(() => []) as any;
        modelRepository.save = jest.fn(() => []) as any;
        materialRepository.save = jest.fn(() => []) as any;
        colorRepository.save = jest.fn(() => []) as any;

        const globalDressOptions = await settingsService.setGlobalDressOptions({
            categories: mockCategories, models: mockModels, materials: mockMaterials, colors: mockColors,
        });
        expect(globalDressOptions.materials).toStrictEqual(mockMaterials);
    });

    it('should update all colors', async () => {
        const mockCategories = [] as CategoryDTO[];
        const mockModels = [] as SimpleListSetting[];
        const mockMaterials = [] as SimpleListSetting[];
        const mockColors = [] as ColorDTO[];

        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        materialRepository.find = jest.fn(() => mockMaterials) as any;
        colorRepository.find = jest.fn(() => mockColors) as any;

        categoryRepository.save = jest.fn(() => []) as any;
        modelRepository.save = jest.fn(() => []) as any;
        materialRepository.save = jest.fn(() => []) as any;
        colorRepository.save = jest.fn(() => []) as any;

        const globalDressOptions = await settingsService.setGlobalDressOptions({
            categories: mockCategories, models: mockModels, materials: mockMaterials, colors: mockColors,
        });
        expect(globalDressOptions.colors).toStrictEqual(mockColors);
    });

    it('should delete old id', async () => {
        const mockCategories = [{id: 1}] as CategoryDTO[];
        const mockModels = [{id: 1}] as SimpleListSetting[];
        const mockMaterials = [{id: 1}] as SimpleListSetting[];
        const mockColors = [{id: 1}] as ColorDTO[];
        const newCategories = [] as CategoryDTO[];
        const newModels = [] as SimpleListSetting[];
        const newMaterials = [] as SimpleListSetting[];
        const newColors = [] as ColorDTO[];

        categoryRepository.find = jest.fn()
            .mockReturnValueOnce(mockCategories)
            .mockReturnValueOnce(newCategories)
        modelRepository.find = jest.fn()
            .mockReturnValueOnce(mockModels)
            .mockReturnValueOnce(newModels);

        materialRepository.find = jest.fn()
            .mockReturnValueOnce(mockMaterials)
            .mockReturnValueOnce(newMaterials);

        colorRepository.find = jest.fn()
            .mockReturnValueOnce(mockColors)
            .mockReturnValueOnce(newColors);

        categoryRepository.save = jest.fn(() => []) as any;
        modelRepository.save = jest.fn(() => []) as any;
        materialRepository.save = jest.fn(() => []) as any;
        colorRepository.save = jest.fn(() => []) as any;

        categoryRepository.delete = jest.fn(() => []) as any;
        modelRepository.delete = jest.fn( () => []) as any;
        materialRepository.delete = jest.fn(() => []) as any;
        colorRepository.delete = jest.fn(() => []) as any;
        const globalDressOptions = await settingsService.setGlobalDressOptions({
            categories: newCategories, models: newModels, materials: newMaterials, colors: newColors,
        });
        expect(globalDressOptions.categories).toStrictEqual(newCategories);
        expect(globalDressOptions.models).toStrictEqual(newModels);
        expect(globalDressOptions.materials).toStrictEqual(newMaterials);
        expect(globalDressOptions.colors).toStrictEqual(newColors);
    });

    it('should throw error of invalid id', async () => {
        const mockCategories = [{id: 1}] as CategoryDTO[];
        const mockModels = [{id: 1}] as SimpleListSetting[];
        const mockMaterials = [{id: 1}] as SimpleListSetting[];
        const mockColors = [{id: 1}] as ColorDTO[];
        const newCategories = [{id: 2}] as CategoryDTO[];
        const newModels = [{id: 2}] as SimpleListSetting[];
        const newMaterials = [{id: 2}] as SimpleListSetting[];
        const newColors = [{id: 2}] as ColorDTO[];
        categoryRepository.find = jest.fn(() => mockCategories) as any;
        modelRepository.find = jest.fn(() => mockModels) as any;
        materialRepository.find = jest.fn(() => mockMaterials) as any;
        colorRepository.find = jest.fn(() => mockColors) as any;


        await expect( () => settingsService.setGlobalDressOptions({
            categories: newCategories, models: newModels, materials: newMaterials, colors: newColors,
        })).rejects.toThrowError(error);
    });

});
