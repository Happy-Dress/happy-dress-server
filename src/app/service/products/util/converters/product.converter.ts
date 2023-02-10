import { Inject, Injectable } from '@nestjs/common';
import { ProductViewDto } from '../../model/product.view.dto';
import { CategoryConverter } from '../../../settings/util/converters/category.converter';
import { SimpleListSettingConverter } from '../../../util/converter/simple.list.setting.converter';
import { ProductDto } from '../../model/product.dto';
import { ProductEntity } from '../../../../repository/product/entity/product.entity';
import { ProductColorSizeEntity } from '../../../../repository/product/product-color-size/entity/product-color-size.entity';
import { ProductColorSizeViewDto } from '../../model/product-color-size.view.dto';


@Injectable()
export class ProductConverter  {

  @Inject()
  readonly categoryConverter: CategoryConverter;

  @Inject()
  readonly simpleListSettingConverter: SimpleListSettingConverter;


  async convertToViewDto(productEntity: ProductEntity, productColorSizeEntities: ProductColorSizeEntity[]): Promise<ProductViewDto> {
    const categoryEntity = await productEntity.category;
    const categoryDto = categoryEntity === null ? null : await this.categoryConverter.convertToDTO(categoryEntity);
    const modelEntity = await productEntity.model;
    const modelDto = modelEntity === null ? null : await this.simpleListSettingConverter.convertToDTO(modelEntity);
    const materialEntities = productEntity.materials;
    const materialDtos = materialEntities === null ? null : await this.simpleListSettingConverter.convertToDTOs(materialEntities);
    const productColoSizeDtos = productColorSizeEntities === null ? null : this.convertToProductColorSizeViewDtos(productColorSizeEntities);
    return {
      id: productEntity.id,
      name: productEntity.name,
      description: productEntity.description,
      category: categoryDto,
      model: modelDto,
      materials: materialDtos,
      productColorSize: productColoSizeDtos,
    };
  }

  convertToProductColorSizeViewDtos(productColorSizes: ProductColorSizeEntity[]): ProductColorSizeViewDto[] {
    return productColorSizes.map(productColorSize => {
      return {
        color: productColorSize.color,
        size: productColorSize.size,
        isAvailable: productColorSize.isAvailable,
      };
    });
  }

  convertToPartialEntity(productDto: ProductDto): Partial<ProductEntity> {
    return {
      id: productDto.id,
      name: productDto.name,
      description: productDto.description,
    };
  }


}
