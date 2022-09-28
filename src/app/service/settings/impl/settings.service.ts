import { Inject, Injectable } from '@nestjs/common';
import { ISettingsService } from '../settings.service.abstraction';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { GlobalDressOptionsDTO } from '../model/GlobalDressOptionsDTO';
import { CategoryEntity } from '../../../repository/category/entity/category.entity';
import { CategoryConverter } from '../util/category.converter';
import { GlobalDressOptionsConverter } from '../util/globalDressOptions.converter';

@Injectable()
export class SettingsService implements ISettingsService {
  @InjectRepository(CategoryEntity)
  private categoryEntityRepository: Repository<CategoryEntity>;

  @Inject()
  private readonly categoryConverter: CategoryConverter;

  @Inject()
  private readonly globalDressOptionsConverter: GlobalDressOptionsConverter;

  public async getGlobalDressOptions(): Promise<GlobalDressOptionsDTO> {
    const categoryEntities = await this.categoryEntityRepository.find();
    const categoryDTOs = this.categoryConverter.convertToDTO(categoryEntities);
    return this.globalDressOptionsConverter.convertToDTO(categoryDTOs);
  }

  public async setGlobalDressOptions(globalDressOptionsDTO: GlobalDressOptionsDTO): Promise<GlobalDressOptionsDTO> {
    const categoryEntities = this.categoryConverter.convertToEntity(globalDressOptionsDTO.categories);
    await this.categoryEntityRepository.clear();
    await this.categoryEntityRepository.insert(categoryEntities);
    return this.getGlobalDressOptions();
  }
  
}