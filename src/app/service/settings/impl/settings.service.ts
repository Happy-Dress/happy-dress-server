import { Inject, Injectable } from '@nestjs/common';
import { ISettingsService } from '../settings.service.abstraction';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { GlobalDressOptionsDTO } from '../model/GlobalDressOptionsDTO';
import { CategoryEntity } from '../../../repository/category/entity/category.entity';
import { SimpleListSettingConverter } from '../util/simpleListSetting.converter';

@Injectable()
export class SettingsService implements ISettingsService {
  @InjectRepository(CategoryEntity)
  private categoryEntityRepository: Repository<CategoryEntity>;

  @Inject()
  private readonly categoryConverter: SimpleListSettingConverter;
  

  public async getGlobalDressOptions(): Promise<GlobalDressOptionsDTO> {
    const categoryEntities = await this.categoryEntityRepository.find();
    const categoryDTOs = this.categoryConverter.convertToDTO(categoryEntities);
    return { categories: categoryDTOs };
  }

  public async setGlobalDressOptions(globalDressOptionsDTO: GlobalDressOptionsDTO): Promise<GlobalDressOptionsDTO> {
    const categoryEntities = this.categoryConverter.convertToEntity(globalDressOptionsDTO.categories);
    await this.categoryEntityRepository.clear();
    await this.categoryEntityRepository.save(categoryEntities);
    return this.getGlobalDressOptions();
  }

}