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
    await this.categoryEntityRepository.clear();
    await this.categoryEntityRepository.insert(categoryEntities);
    await this.modelEntityRepository.clear();
    await this.modelEntityRepository.insert(modelsEntities);
    return this.getGlobalDressOptions();
  }

}
