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
import { ProductColorSizeEntity } from '../../../repository/product/product-color-size/entity/product-color-size.entity';
import {
  ProductColorImageEntity,
} from '../../../repository/product/product-color-image/entity/product-color-image.entity';
import { Transactional } from 'typeorm-transactional';
import { EntitiesNotFoundByIdsException } from '../../../exception/entities-not-found-by-ids.exception';
import { IProductColorSizeImagesService } from '../productColorSizeImage/productColorSizeImages.service.abstraction';

const PRODUCTS = 'Продукты';


@Injectable()
export class ProductsService implements IProductsService {

  @InjectRepository(ProductEntity)
  readonly productsRepository: Repository<ProductEntity>;

  @InjectRepository(ProductColorSizeEntity)
  readonly productColorSizesRepository: Repository<ProductColorSizeEntity>;
  
  @InjectRepository(ProductColorImageEntity)
  readonly productColorImagesRepository: Repository<ProductColorImageEntity>;

  @Inject()
  readonly productConverter: ProductConverter;

  @Inject()
  readonly settingsService: ISettingsService;
  
  @Inject()
  readonly productColorSizeImagesService: IProductColorSizeImagesService;

  @Transactional()
  public async createProduct(product: ProductDto): Promise<ProductViewDto> {
    const productEntity = await this.getProductEntity(product);
    const savedProductEntity = await this.productsRepository.save(productEntity);

    const productColorSizeEntities = await this.productColorSizeImagesService.getProductColorSizes(product.productColorSizes, savedProductEntity);
    const savedProductColorSizeEntities = await this.productColorSizesRepository.save(productColorSizeEntities);
    
    const productColorImageEntities = await this.productColorSizeImagesService.getProductColorImages(product.productColorImages, savedProductEntity);
    const savedProductColorImageEntities = await this.productColorImagesRepository.save(productColorImageEntities);

    return this.productConverter.convertToViewDto(savedProductEntity, savedProductColorSizeEntities, savedProductColorImageEntities);
  }

  @Transactional()
  public async deleteProduct(id: number): Promise<void> {
    const deleteResult = await this.productsRepository.delete({ id: id } as FindOptionsWhere<ProductEntity>);
    if (deleteResult.affected === 0) {
      throw new EntitiesNotFoundByIdsException([id], PRODUCTS);
    }
  }

  @Transactional()
  public async getProduct(id: number): Promise<ProductViewDto> {
    const productEntity = await this.findProductById(id);
    if (productEntity === null) {
      throw new EntitiesNotFoundByIdsException([id], PRODUCTS);
    }

    const productColorSizeEntities = await this.productColorSizesRepository.findBy({ product: {
      id: id,
    } } as FindOptionsWhere<ProductColorSizeEntity>);
    
    const productColorImageEntities = await this.productColorImagesRepository.findBy({ product: {
      id: id,
    } } as FindOptionsWhere<ProductColorSizeEntity>);

    return this.productConverter.convertToViewDto(productEntity, productColorSizeEntities, productColorImageEntities);
  }

  @Transactional()
  public async updateProduct(id: number, product: ProductDto): Promise<ProductViewDto> {
    if (await this.findProductById(id) === null) {
      throw new EntitiesNotFoundByIdsException([id], PRODUCTS);
    }

    const partialProductEntity = await this.getProductEntity(product);
    partialProductEntity.id = id;

    const savedProductEntity = await this.productsRepository.save(partialProductEntity);

    await this.productColorSizesRepository.delete({ product: savedProductEntity } as FindOptionsWhere<ProductColorSizeEntity>);
    const productColorSizeEntities = await this.productColorSizeImagesService.getProductColorSizes(product.productColorSizes, savedProductEntity);
    const savedProductColorSizeEntities = await this.productColorSizesRepository.save(productColorSizeEntities);

    await this.productColorImagesRepository.delete({ product: savedProductEntity } as FindOptionsWhere<ProductColorImageEntity>);
    const productColorImageEntities = await this.productColorSizeImagesService.getProductColorImages(product.productColorImages, savedProductEntity);
    const savedProductColorImageEntities = await this.productColorImagesRepository.save(productColorImageEntities);

    return this.productConverter.convertToViewDto(savedProductEntity, savedProductColorSizeEntities, savedProductColorImageEntities);
  }

  private async getProductEntity(product: ProductDto): Promise<ProductEntity> {
    const categoryEntity = await this.settingsService.getSettingEntityById<CategoryEntity>(product.categoryId, SettingType.CATEGORIES);
    const modelEntity = await this.settingsService.getSettingEntityById<ModelEntity>(product.modelId, SettingType.MODELS);
    const materialIds = new Set<number>(product.materialIds.map(materialId => materialId));
    const materialEntities = await this.settingsService.getSettingEntitiesByIds<MaterialEntity>(materialIds, SettingType.MATERIALS);
    const partialEntity = this.productConverter.convertToPartialEntity(product);
    return {
      id: product.id,
      name: partialEntity.name,
      description: partialEntity.description,
      category: categoryEntity,
      model: modelEntity,
      materials: materialEntities,
    };
  }

  private async findProductById(id: number): Promise<ProductEntity> {
    return this.productsRepository.findOne({ where: { id: id } as FindOptionsWhere<ProductEntity> });
  }
}
