import { Inject, Injectable } from '@nestjs/common';
import { ISettingsService } from '../settings.service.abstraction';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalDressOptionsDTO } from '../model/GlobalDressOptionsDTO';
import { CategoryEntity } from '../../../repository/settings/category/entity/category.entity';
import { SimpleListSettingConverter } from '../util/simpleListSetting.converter';
import { ModelEntity } from '../../../repository/settings/model/entity/model.entity';
import { Transactional } from 'typeorm-transactional';
import { CategoryConverter } from '../util/category.converter';
import { CategoryDTO } from '../model/CategoryDTO';
import { SimpleListSetting } from '../model/SimpleListSetting';
import { EntitiesNotFoundByIds } from '../exception/entities-not-found-by.ids';

@Injectable()
export class SettingsService implements ISettingsService {
  @InjectRepository(CategoryEntity)
  private categoryEntityRepository: Repository<CategoryEntity>;

  @InjectRepository(ModelEntity)
  private modelEntityRepository: Repository<ModelEntity>;

  @Inject()
  private readonly simpleListSettingConverter: SimpleListSettingConverter;

  @Inject()
  private readonly categoryConverter: CategoryConverter;

  private readonly NAME_CATEGORY = 'Категории';
  private readonly NAME_MODEL = 'Модели';


  public async getGlobalDressOptions(): Promise<GlobalDressOptionsDTO> {
    const categoryEntities = await this.categoryEntityRepository.find();
    const categoryDTOs = this.categoryConverter.convertToDTO(categoryEntities);
    const modelEntities = await this.modelEntityRepository.find();
    const modelDTOs = this.simpleListSettingConverter.convertToDTO(modelEntities);
    return {
      categories: categoryDTOs,
      models: modelDTOs,
    };
  }

  @Transactional()
  public async setGlobalDressOptions(globalDressOptionsDTO: GlobalDressOptionsDTO): Promise<GlobalDressOptionsDTO> {
    const { categories: categoriesToUpdate, models: modelsToUpdate } = globalDressOptionsDTO;
    const { categories: currentCategories, models: currentModels } = await this.getGlobalDressOptions();
    await this.updateCategories(currentCategories, categoriesToUpdate);
    await this.updateModels(currentModels, modelsToUpdate);
    return this.getGlobalDressOptions();
  }

  private async updateCategories(currentCategories: CategoryDTO[], categoriesToSave: CategoryDTO[]): Promise<void> {
    const entities = this.categoryConverter.convertToEntity(categoriesToSave);
    const entitiesIds = entities.map((entity)=> entity.id ).filter(id => !!id);
    const currentIds = currentCategories.map(category => category.id);
    this.checkIds(currentIds, entitiesIds, this.NAME_CATEGORY);
    const idsToDelete = currentCategories.filter((category)=> !entitiesIds.includes(category.id)).map(category => category.id);
    await this.categoryEntityRepository.save(entities);
    if (idsToDelete.length) {
      await this.categoryEntityRepository.delete(idsToDelete);
    }
  }

  private async updateModels(currentModels: SimpleListSetting[], modelsToSave: SimpleListSetting[]): Promise<void>{
    const entities = this.simpleListSettingConverter.convertToEntity(modelsToSave);
    const entitiesIds = entities.map(entity => entity.id).filter(id => !!id);
    const currentIds = currentModels.map(model => model.id);
    this.checkIds(currentIds, entitiesIds, this.NAME_MODEL);
    const idsToDelete = currentModels.filter(model => !entitiesIds.includes(model.id)).map(model => model.id);
    await this.modelEntityRepository.save(entities);
    if (idsToDelete.length) {
      await this.modelEntityRepository.delete(idsToDelete);
    }
  }

  private checkIds(currentIds: number[], newEntitiesIds: number[], name: string): void {
    if (currentIds.length && newEntitiesIds.length) {
      const invalidIds = newEntitiesIds.filter(id => !currentIds.includes(id));
      if (invalidIds.length) {
        throw new EntitiesNotFoundByIds(name, invalidIds);
      }
    }
  }
}
