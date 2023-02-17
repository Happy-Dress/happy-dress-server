import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ISettingsService } from '../settings.service.abstraction';
import { Transactional } from 'typeorm-transactional';
import { MaterialsCrudService } from '../crud/materials.crud.service';
import { SettingType } from '../util/constant/setting.type.enum';
import { CrudService } from '../../util/crud/crud.service';
import { IdentifiedEntity } from '../../util/model/entity/identified.entity';
import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { ColorsCrudService } from '../crud/colors.crud.service';
import { CategoriesCrudService } from '../crud/categories.crud.service';
import { ModelsCrudService } from '../crud/models.crud.service';
import { GlobalDressOptionsDto } from '../model/global-dress-options.dto';
import { ColorDto } from '../model/color.dto';
import { ModelDto } from '../model/model.dto';
import { MaterialDto } from '../model/material.dto';
import { CategoryDto } from '../model/category.dto';
import { SizesCrudService } from '../crud/sizes.crud.service';
import { SizeDto } from '../model/size.dto';

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
    
    @Inject()
    private sizesCrudService: SizesCrudService;


    onModuleInit(): void {
      this.crudServiceMap = new Map<SettingType, CrudService<IdentifiedEntity, IdentifiedModel>>([
        [SettingType.MATERIALS, this.materialsCrudService],
        [SettingType.COLORS, this.colorsCrudService],
        [SettingType.MODELS, this.modelsCrudService],
        [SettingType.CATEGORIES, this.categoriesCrudService],
        [SettingType.SIZES, this.sizesCrudService],
      ]);
    }

    public async getGlobalDressOptions(): Promise<GlobalDressOptionsDto> {
      const categoryDTOs = await this.categoriesCrudService.getAll();
      const modelDTOs = await this.modelsCrudService.getAll();
      const materialDTOs = await this.materialsCrudService.getAll();
      const colorDTOs = await this.colorsCrudService.getAll();
      const sizeDTOs = await this.sizesCrudService.getAll();
      return {
        categories: categoryDTOs,
        models: modelDTOs,
        materials: materialDTOs,
        colors: colorDTOs,
        sizes: sizeDTOs,
      };
    }

    @Transactional()
    public async setGlobalDressOptions(globalDressOptionsDTO: GlobalDressOptionsDto): Promise<GlobalDressOptionsDto> {
      const {
        categories: categoriesToUpdate,
        models: modelsToUpdate,
        materials: materialsToUpdate,
        colors: colorsToUpdate, 
        sizes: sizesToUpdate,
      } = globalDressOptionsDTO;
      await this.updateSetting<ColorDto>(SettingType.COLORS, colorsToUpdate);
      await this.updateSetting<ModelDto>(SettingType.MODELS, modelsToUpdate);
      await this.updateSetting<MaterialDto>(SettingType.MATERIALS, materialsToUpdate);
      await this.updateSetting<CategoryDto>(SettingType.CATEGORIES, categoriesToUpdate);
      await this.updateSetting<SizeDto>(SettingType.SIZES, sizesToUpdate);
      return this.getGlobalDressOptions();
    }

    public async getSettingEntitiesByIds<Entity extends IdentifiedEntity>(ids: Set<number>, type: SettingType): Promise<Entity[]> {
      return await this.crudServiceMap.get(type).getEntitiesByIds(ids) as Entity[];
    }

    public async getSettingEntityById<Entity extends IdentifiedEntity>(id: number, type: SettingType): Promise<Entity> {
      return await this.crudServiceMap.get(type).getEntityById(id) as Entity;
    }

    private async updateSetting<DTO>(settingType: SettingType, DTOs: DTO[]): Promise<void> {
      await this.crudServiceMap.get(settingType).update(DTOs);
    }
}
