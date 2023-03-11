import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../../../repository/settings/category/entity/category.entity';
import { MultiConverter } from '../../../util/converter/multi.converter';
import { CategoryDto } from '../../model/category.dto';


@Injectable()
export class CategoryConverter extends MultiConverter<CategoryEntity, CategoryDto> {

  public convertToEntity(dto: CategoryDto): Promise<CategoryEntity> {
    return Promise.resolve({
      id: dto.id,
      name: dto.name,
      orderNumber: dto.orderNumber,
      description: dto.description,
      imageUrl: dto.imageUrl,
    });
  }

  public convertToDTO(entity: CategoryEntity): Promise<CategoryDto> {
    return Promise.resolve({
      id: entity.id,
      name: entity.name,
      orderNumber: entity.orderNumber,
      description: entity.description,
      imageUrl: entity.imageUrl,
    });

  }
}
