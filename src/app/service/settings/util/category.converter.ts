import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../../repository/category/entity/category.entity';
import { CategoryDTO } from '../model/CategoryDTO';

@Injectable()
export class CategoryConverter{
  public convertToDTO(categoryEntities: CategoryEntity[]): CategoryDTO[]{
    const categoryDTOs: CategoryDTO[] = [];
    categoryEntities.forEach(value => categoryDTOs.push({ id: value.id, description: value.description }));
    return categoryDTOs;
  }
  
  public convertToEntity(categoryDTOs: CategoryDTO[]): CategoryEntity[]{
    const categoryEntities: CategoryEntity[] = [];
    categoryDTOs.forEach(value => categoryEntities.push({ id: value.id, description: value.description }));
    return categoryEntities;
  }
}