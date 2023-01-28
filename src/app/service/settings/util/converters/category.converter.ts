import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../../../repository/settings/category/entity/category.entity';
import { CategoryDTO } from '../../model/CategoryDTO';
import {MultiConverter} from "../../../util/converter/multi.converter";

@Injectable()
export class CategoryConverter extends MultiConverter<CategoryEntity, CategoryDTO> {

  public convertToDTOs(dtos: CategoryEntity[]): CategoryDTO[] {
    return dtos.map(value => ({
      id: value.id,
      name: value.name,
      description: value.description,
      imageUrl: value.imageUrl,  
    }));
  }

  public convertToEntities(entities: CategoryDTO[]): CategoryEntity[] {
    return entities.map(value => ({
      id: value.id,
      name: value.name,
      description: value.description,
      imageUrl: value.imageUrl,
    }));
  }
}
