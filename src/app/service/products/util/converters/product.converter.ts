import {Inject, Injectable} from '@nestjs/common';
import {ProductViewDto} from "../../model/product.view.dto";
import {CategoryConverter} from "../../../settings/util/converters/category.converter";
import {SimpleListSettingConverter} from "../../../util/converter/simple.list.setting.converter";
import {ProductDto} from "../../model/product.dto";
import {ProductEntity} from "../../../../repository/product/entity/product.entity";


@Injectable()
export class ProductConverter  {

  @Inject()
  readonly categoryConverter: CategoryConverter;

  @Inject()
  readonly simpleListSettingConverter: SimpleListSettingConverter;


  async convertToViewDto(productEntity: ProductEntity): Promise<ProductViewDto> {
    const categoryEntity = await productEntity.category;
    const categoryDto = await this.categoryConverter.convertToDTO(categoryEntity);
    const modelEntity = await productEntity.model;
    const modelDto = await this.simpleListSettingConverter.convertToDTO(modelEntity);
    const materialEntities = productEntity.materials;
    const materialDtos = await this.simpleListSettingConverter.convertToDTOs(materialEntities);
    return {
      id: productEntity.id,
      name: productEntity.name,
      description: productEntity.description,
      category: categoryDto,
      model: modelDto,
      materials: materialDtos,
    }
  }

  convertToPartialEntity(productDto: ProductDto): Partial<ProductEntity> {
    return {
      id: productDto.id,
      name: productDto.name,
      description: productDto.description
    }
  }


}
