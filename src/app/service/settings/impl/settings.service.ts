import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ISettingsService} from '../settings.service.abstraction';
import {GlobalDressOptionsDTO} from '../model/GlobalDressOptionsDTO';
import {Transactional} from 'typeorm-transactional';
import {EntitiesNotFoundByIds} from '../exception/entities-not-found-by.ids';
import {MaterialsCrudService} from "../crud/materials.crud.service";
import {SettingsNotFoundByIds} from "../exception/settings-not-found-by-ids";
import {SettingType} from "../util/constant/setting.type.enum";
import {CrudService} from "../../util/crud/crud.service";
import {IdentifiedEntity} from "../../util/identified.entity";
import {IdentifiedModel} from "../../util/identified.model";
import {ColorsCrudService} from "../crud/colors.crud.service";
import {CategoriesCrudService} from "../crud/categories.crud.service";
import {ModelsCrudService} from "../crud/models.crud.service";
import {ColorDTO} from "../model/ColorDTO";
import {SimpleListSetting} from "../model/SimpleListSetting";
import {CategoryDTO} from "../model/CategoryDTO";

@Injectable()
export class SettingsService implements ISettingsService, OnModuleInit {

    private crudServiceMap: Map<SettingType, CrudService<IdentifiedEntity, IdentifiedModel>>;

    @Inject()
    private materialsCrudService: MaterialsCrudService;

    @Inject()
    private categoriesCrudService: CategoriesCrudService;

    @Inject()
    private modelsCrudService: ModelsCrudService;

    @Inject()
    private colorsCrudService: ColorsCrudService;


    onModuleInit() {
        this.crudServiceMap = new Map<SettingType, CrudService<IdentifiedEntity, IdentifiedModel>>([
            [SettingType.MATERIALS, this.materialsCrudService],
            [SettingType.COLORS, this.materialsCrudService],
            [SettingType.MODELS, this.modelsCrudService],
            [SettingType.CATEGORIES, this.categoriesCrudService]

        ])
    }

    public async getGlobalDressOptions(): Promise<GlobalDressOptionsDTO> {
        const categoryDTOs = await this.categoriesCrudService.getAll();
        const modelDTOs = await this.modelsCrudService.getAll();
        const materialDTOs = await this.materialsCrudService.getAll();
        const colorDTOs = await this.colorsCrudService.getAll();
        return {
            categories: categoryDTOs,
            models: modelDTOs,
            materials: materialDTOs,
            colors: colorDTOs,
        };
    }

    @Transactional()
    public async setGlobalDressOptions(globalDressOptionsDTO: GlobalDressOptionsDTO): Promise<GlobalDressOptionsDTO> {
        const {
            categories: categoriesToUpdate,
            models: modelsToUpdate,
            materials: materialsToUpdate,
            colors: colorsToUpdate,
        } = globalDressOptionsDTO;
        await this.updateSetting<ColorDTO>(SettingType.COLORS, colorsToUpdate);
        await this.updateSetting<SimpleListSetting>(SettingType.MODELS, modelsToUpdate);
        await this.updateSetting<SimpleListSetting>(SettingType.MATERIALS, materialsToUpdate);
        await this.updateSetting<CategoryDTO>(SettingType.CATEGORIES, categoriesToUpdate);
        return this.getGlobalDressOptions();
    }

    private async updateSetting<DTO>(settingType: SettingType, dtos: DTO[]): Promise<void> {
        try {
            await this.crudServiceMap.get(settingType).update(dtos);
        } catch (error) {
            if (error instanceof EntitiesNotFoundByIds) {
                throw new SettingsNotFoundByIds(error.invalidIds, SettingType.MATERIALS);
            }
            throw error;
        }

    }


}
