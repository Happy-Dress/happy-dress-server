import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../../../repository/settings/category/entity/category.entity';
import { MultiConverter } from '../../../util/converter/multi.converter';
import { CategoryDto } from '../../model/category.dto';


@Injectable()
export class CategoryConverter extends MultiConverter<CategoryEntity, CategoryDto> {

  public convertToEntity(dto: CategoryDto): CategoryEntity {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      imageUrl: dto.imageUrl,
    };
  }

  public convertToDTO(entity: CategoryEntity): Promise<CategoryDto> {
    return Promise.resolve({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      imageUrl: entity.imageUrl,
    });
  }
}
