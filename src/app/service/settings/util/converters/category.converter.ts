import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../../../repository/settings/category/entity/category.entity';
import { MultiConverter } from '../../../util/converter/multi.converter';
import { CategoryDto } from '../../model/category.dto';


@Injectable()
export class CategoryConverter extends MultiConverter<CategoryEntity, CategoryDto> {

<<<<<<< HEAD
  public convertToDTOs(dtos: CategoryEntity[]): CategoryDto[] {
    return dtos.map(value => ({
      id: value.id,
      name: value.name,
      orderNumber: value.orderNumber,
      description: value.description,
      imageUrl: value.imageUrl,
    }));
  }

  public convertToEntities(entities: CategoryDto[]): CategoryEntity[] {
    return entities.map(value => ({
      id: value.id,
      name: value.name,
      orderNumber: value.orderNumber,
      description: value.description,
      imageUrl: value.imageUrl,
    }));
=======
  public convertToEntity(dto: CategoryDto): Promise<CategoryEntity> {
    return Promise.resolve({
      id: dto.id,
      name: dto.name,
      description: dto.description,
      imageUrl: dto.imageUrl,
    });
  }

  public convertToDTO(entity: CategoryEntity): Promise<CategoryDto> {
    return Promise.resolve({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      imageUrl: entity.imageUrl,
    });
>>>>>>> develop
  }
}
