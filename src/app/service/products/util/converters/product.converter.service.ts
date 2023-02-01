import { Injectable } from '@nestjs/common';
import { MultiConverter } from '../../../util/converter/multi.converter';
import { ProductEntity } from '../../../../repository/product/entity/product.entity';
import { ProductDto } from '../../model/productDto';
import { SimpleListSettingConverter } from '../../../util/converter/simple.list.setting.converter';
import { CategoryConverter } from '../../../settings/util/converters/category.converter';

@Injectable()
export class ProductConverter extends MultiConverter<ProductEntity, ProductDto> {

  private modelConverter: SimpleListSettingConverter;

  private categoryConverter: CategoryConverter;

  constructor() {
    super();
    this.modelConverter = new SimpleListSettingConverter();
    this.categoryConverter = new CategoryConverter();
  }

  public async convertToDTO(entity: ProductEntity): Promise<ProductDto> {
    const categoryEntity = await entity.category;
    const categoryDto = await this.categoryConverter.convertToDTO(categoryEntity);
    const modelEntity = await entity.model;
    const modelDto = await this.modelConverter.convertToDTO(modelEntity);
    return {
      id: entity.id,
      name: entity.name,
      category: categoryDto,
      categoryId: entity.categoryId,
      model: modelDto,
      modelId: entity.modelId,
    };
  }

  public convertToEntity(dto: ProductDto): ProductEntity {
    return {
      id: dto.id,
      name: dto.name,
      category: null,
      categoryId: dto.categoryId,
      model: null,
      modelId: dto.modelId,
    };
  }

}