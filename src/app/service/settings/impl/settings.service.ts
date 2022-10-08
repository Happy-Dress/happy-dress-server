import { Inject, Injectable } from '@nestjs/common';
import { ISettingsService } from '../settings.service.abstraction';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalDressOptionsDTO } from '../model/GlobalDressOptionsDTO';
import { CategoryEntity } from '../../../repository/settings/category/entity/category.entity';
import { SimpleListSettingConverter } from '../util/simpleListSetting.converter';
import { ModelEntity } from '../../../repository/settings/model/entity/model.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class SettingsService implements ISettingsService {
  @InjectRepository(CategoryEntity)
  private categoryEntityRepository: Repository<CategoryEntity>;

  @InjectRepository(ModelEntity)
  private modelEntityRepository: Repository<ModelEntity>;

  @Inject()
  private readonly simpleListSettingConverter: SimpleListSettingConverter;


  public async getGlobalDressOptions(): Promise<GlobalDressOptionsDTO> {
    const categoryEntities = await this.categoryEntityRepository.find();
    const categoryDTOs = this.simpleListSettingConverter.convertToDTO(categoryEntities);
    const modelEntities = await this.modelEntityRepository.find();
    const modelDTOs = this.simpleListSettingConverter.convertToDTO(modelEntities);
    return {
      categories: categoryDTOs,
      models: modelDTOs,
    };
  }

  @Transactional()
  public async setGlobalDressOptions(globalDressOptionsDTO: GlobalDressOptionsDTO): Promise<GlobalDressOptionsDTO> {
    const categoryEntities = this.simpleListSettingConverter.convertToEntity(globalDressOptionsDTO.categories);
    const modelsEntities = this.simpleListSettingConverter.convertToEntity(globalDressOptionsDTO.models);
    const currentCategories = await this.categoryEntityRepository.find();
    const currentModels = await this.modelEntityRepository.find();
    if (currentCategories.length) {
      await this.categoryEntityRepository.delete(currentCategories.map((c) => c.id ));
    }
    if (currentModels.length) {
      await this.modelEntityRepository.delete( currentModels.map((c) => c.id ));
    }

    await this.categoryEntityRepository.save(categoryEntities);
    await this.modelEntityRepository.save(modelsEntities);
    throw new Error();
    return this.getGlobalDressOptions();
  }

}
