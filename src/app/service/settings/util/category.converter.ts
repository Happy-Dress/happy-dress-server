import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../../repository/settings/category/entity/category.entity';
import { CategoryDTO } from '../model/CategoryDTO';

@Injectable()
export class CategoryConverter {
  public convertToDTO(categoryEntities: CategoryEntity[]): CategoryDTO[] {
    return categoryEntities.map(value => ({
      id: value.id,
      name: value.name,
      description: value.description,
      imageUrl: value.imageUrl,  
    }));
  }

  public convertToEntity(categoryDTOs: CategoryDTO[]): CategoryEntity[] {
    return categoryDTOs.map(value => ({
      id: value.id,
      name: value.name,
      description: value.description,
      imageUrl: value.imageUrl,
    }));
  }
}