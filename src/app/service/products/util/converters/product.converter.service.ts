import { Injectable } from '@nestjs/common';
import { MultiConverter } from '../../../util/converter/multi.converter';
import { ProductEntity } from '../../../../repository/product/entity/product.entity';
import { ProductDto } from '../../model/productDto';
import { UpdateProductDto } from '../../model/updateProductDto';
import { CategoryEntity } from '../../../../repository/settings/category/entity/category.entity';
import { ModelEntity } from '../../../../repository/settings/model/entity/model.entity';
import { MaterialEntity } from '../../../../repository/settings/material/entity/material.entity';

@Injectable()
export class ProductConverter extends MultiConverter<ProductEntity, ProductDto> {

  public async convertToDTO(entity: ProductEntity): Promise<ProductDto> {
    return {
      id: entity.id,
      name: entity.name,
      category: await entity.category,
      model: await entity.model,
      materials: entity.materials,
    };
  }

  public async convertUpdateDtoToEntity(dto: UpdateProductDto, categoryEntity: CategoryEntity,
    modelEntity: ModelEntity, materialEntities: MaterialEntity[]
  ): Promise<ProductEntity> {
    return Promise.resolve({
      id: dto.id,
      name: dto.name,
      category: Promise.resolve(categoryEntity),
      categoryId: dto.categoryId,
      model: Promise.resolve(modelEntity),
      modelId: dto.modelId,
      materials: materialEntities,
    });
  }

  public async convertToEntity(dto: ProductDto): Promise<ProductEntity> {
    const materials = dto.materials.map((material) => {
      return {
        id: material.id,
        name: material.name,
      };
    });
    return Promise.resolve({
      id: dto.id,
      name: dto.name,
      category: Promise.resolve({
        id: dto.category.id,
        name: dto.category.name,
        description: dto.category.description,
        imageUrl: dto.category.imageUrl,
      }),
      categoryId: dto.category.id,
      model: Promise.resolve({
        id: dto.model.id,
        name: dto.model.name,
      }),
      modelId: dto.model.id,
      materials: materials,
    });
  }
}