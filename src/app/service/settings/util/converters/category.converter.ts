import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../../../repository/settings/category/entity/category.entity';
import { MultiConverter } from '../../../util/converter/multi.converter';
import { CategoryDto } from '../../model/category.dto';


@Injectable()
export class CategoryConverter extends MultiConverter<CategoryEntity, CategoryDto> {

  public convertToDTOs(dtos: CategoryEntity[]): CategoryDto[] {
    return dtos.map(value => ({
      id: value.id,
      name: value.name,
      description: value.description,
      imageUrl: value.imageUrl,
    }));
  }

  public convertToEntities(entities: CategoryDto[]): CategoryEntity[] {
    return entities.map(value => ({
      id: value.id,
      name: value.name,
      description: value.description,
      imageUrl: value.imageUrl,
    }));
  }
}
