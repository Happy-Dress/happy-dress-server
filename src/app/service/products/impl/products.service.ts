import { Inject, Injectable } from '@nestjs/common';
import { IProductsService } from '../products.service.abstraction';
import { ProductDto } from '../model/product.dto';
import { ProductViewDto } from '../model/product.view.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../../repository/product/entity/product.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ProductConverter } from '../util/converters/product.converter';
import { SettingType } from '../../settings/util/constant/setting.type.enum';
import { CategoryEntity } from '../../../repository/settings/category/entity/category.entity';
import { ModelEntity } from '../../../repository/settings/model/entity/model.entity';
import { MaterialEntity } from '../../../repository/settings/material/entity/material.entity';
import { ISettingsService } from '../../settings/settings.service.abstraction';


@Injectable()
export class ProductsService implements IProductsService {

  @InjectRepository(ProductEntity)
  readonly productsRepository: Repository<ProductEntity>;

  @Inject()
  readonly productConverter: ProductConverter;

  @Inject()
  readonly settingsService: ISettingsService;


  async createProduct(product: ProductDto): Promise<ProductViewDto> {
    const categoryEntity = await this.settingsService.getSettingEntityById<CategoryEntity>(product.categoryId, SettingType.CATEGORIES);
    const modelEntity = await this.settingsService.getSettingEntityById<ModelEntity>(product.modelId, SettingType.MODELS);
    const materialEntities = await this.settingsService.getSettingEntitiesByIds<MaterialEntity>(product.materialIds, SettingType.MATERIALS);
    const partialEntity = this.productConverter.convertToPartialEntity(product);

    partialEntity.category = categoryEntity;
    partialEntity.model = modelEntity;
    partialEntity.materials = materialEntities;

    const savedEntity = await this.productsRepository.save(partialEntity as ProductEntity);
    return this.productConverter.convertToViewDto(savedEntity);
  }

  //TODO: add check if not found by id
  async deleteProduct(id: number): Promise<void> {
    await this.productsRepository.delete({ id: id } as FindOptionsWhere<ProductEntity>);
  }

  //TODO: add check if not found by id
  async getProduct(id: number): Promise<ProductViewDto> {
    const entity = await this.productsRepository.findOne({ where: { id: id } as FindOptionsWhere<ProductEntity> });
    return this.productConverter.convertToViewDto(entity);
  }

  async updateProduct(id: number, product: ProductDto): Promise<ProductViewDto> {
    const categoryEntity = await this.settingsService.getSettingEntityById<CategoryEntity>(product.categoryId, SettingType.CATEGORIES);
    const modelEntity = await this.settingsService.getSettingEntityById<ModelEntity>(product.modelId, SettingType.MODELS);
    const materialEntities = await this.settingsService.getSettingEntitiesByIds<MaterialEntity>(product.materialIds, SettingType.MATERIALS);
    const partialEntity = this.productConverter.convertToPartialEntity(product);

    partialEntity.id = id;
    partialEntity.category = categoryEntity;
    partialEntity.model = modelEntity;
    partialEntity.materials = materialEntities;

    const savedEntity = await this.productsRepository.save(partialEntity as ProductEntity);
    return this.productConverter.convertToViewDto(savedEntity);
  }
}
