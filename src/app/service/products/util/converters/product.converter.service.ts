import { Injectable } from '@nestjs/common';
import { MultiConverter } from '../../../util/converter/multi.converter';
import { ProductEntity } from '../../../../repository/product/entity/product.entity';
import { ProductDto } from '../../model/productDto';
import { SimpleListSettingConverter } from '../../../util/converter/simple.list.setting.converter';
import { CategoryConverter } from '../../../settings/util/converters/category.converter';
import { MaterialEntity } from '../../../../repository/settings/material/entity/material.entity';

@Injectable()
export class ProductConverter extends MultiConverter<ProductEntity, ProductDto> {

  private modelConverter: SimpleListSettingConverter;

  private categoryConverter: CategoryConverter;

  private materialConverter: SimpleListSettingConverter;
  private readonly existingMaterialEntities: Promise<MaterialEntity[]>;

  constructor(existingMaterialEntities: Promise<MaterialEntity[]>) {
    super();
    this.modelConverter = new SimpleListSettingConverter();
    this.categoryConverter = new CategoryConverter();
    this.materialConverter = new SimpleListSettingConverter();
    this.existingMaterialEntities = existingMaterialEntities;
  }

  public async convertToDTO(entity: ProductEntity): Promise<ProductDto> {
    const categoryEntity = await entity.category;
    const categoryDto = await this.categoryConverter.convertToDTO(categoryEntity);
    const modelEntity = await entity.model;
    const modelDto = await this.modelConverter.convertToDTO(modelEntity);
    const materialEntities = await entity.materials;
    const materialDtos = await this.materialConverter.convertToDTOs(materialEntities);
    return {
      id: entity.id,
      name: entity.name,
      category: categoryDto,
      categoryId: entity.categoryId,
      model: modelDto,
      modelId: entity.modelId,
      materials: materialDtos,
    };
  }

  public async convertToEntity(dto: ProductDto): Promise<ProductEntity> {
    const entities = await this.existingMaterialEntities;
    const materialEntities = dto.materials.map(material => entities.find((entity) => entity.id === material.id));
    return {
      id: dto.id,
      name: dto.name,
      category: null,
      categoryId: dto.categoryId,
      model: null,
      modelId: dto.modelId,
      materials: Promise.resolve(materialEntities),
    };
  }

}