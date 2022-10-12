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
    const { categories: categoriesToUpdate } = globalDressOptionsDTO;
    const { categories: currentCategories } = await this.getGlobalDressOptions();
    await this.updateCategories(currentCategories, categoriesToUpdate);
    return this.getGlobalDressOptions();
  }

  private async updateCategories(currentCategories: CategoryDTO[], categoriesToSave: CategoryDTO[]): Promise<void> {
    const entities = this.categoryConverter.convertToEntity(categoriesToSave);
    const entitiesIds = entities.map((entity)=> entity.id ).filter(id => !!id);
    const idsToDelete = currentCategories.filter((category)=> !entitiesIds.includes(category.id)).map(category => category.id);
    await this.categoryEntityRepository.save(entities);
    if (idsToDelete.length) {
      await this.categoryEntityRepository.delete(idsToDelete);
    }
  }

}
