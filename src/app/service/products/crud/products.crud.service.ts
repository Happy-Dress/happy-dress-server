import { CrudService } from '../../util/crud/crud.service';
import { ProductEntity } from '../../../repository/product/entity/product.entity';
import { ProductDto } from '../model/productDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { CategoryConverter } from '../../settings/util/converters/category.converter';
import { SimpleListSettingConverter } from '../../util/converter/simple.list.setting.converter';
import { ProductConverter } from '../util/converters/product.converter.service';
import { CategoriesCrudService } from '../../settings/crud/categories.crud.service';
import { ModelsCrudService } from '../../settings/crud/models.crud.service';
import { MaterialsCrudService } from '../../settings/crud/materials.crud.service';
import { UpdateProductDto } from '../model/updateProductDto';

export class ProductsCrudService extends CrudService<ProductEntity, ProductDto> {

  @Inject()
  private readonly categoriesCrudService: CategoriesCrudService;

  @Inject()
  private readonly modelsCrudService: ModelsCrudService;

  @Inject()
  private readonly materialsCrudService: MaterialsCrudService;

  @Inject()
  private categoryConverter: CategoryConverter;

  @Inject()
  private modelConverter: SimpleListSettingConverter;

  @Inject()
  private materialConverter: SimpleListSettingConverter;

  private productConverter: ProductConverter;

  constructor(
    @InjectRepository(ProductEntity) readonly productsRepository: Repository<ProductEntity>
  ) {
        super(productsRepository, new ProductConverter());
        this.productConverter = new ProductConverter();
  }

  public async addProduct(product: UpdateProductDto): Promise<ProductDto> {
    const categoryDto = await this.categoriesCrudService.getById(product.categoryId);
    const categoryEntity = await this.categoryConverter.convertToEntity(categoryDto);
    const modelDto = await this.modelsCrudService.getById(product.modelId);
    const modelEntity = await this.modelConverter.convertToEntity(modelDto);
    const materialDtos = await this.materialsCrudService.findAllByIds(product.materialIds);
    const materialEntities = await this.materialConverter.convertToEntities(materialDtos);
    const productEntity = await this.productConverter.convertUpdateDtoToEntity(product, categoryEntity, modelEntity, materialEntities);
    await this.repository.save(productEntity);
    return await this.getById(productEntity.id);
  }
}