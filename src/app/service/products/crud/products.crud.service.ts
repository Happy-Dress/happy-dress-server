import { CrudService } from '../../util/crud/crud.service';
import { ProductEntity } from '../../../repository/product/entity/product.entity';
import { ProductDto } from '../model/productDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductConverter } from '../util/converters/product.converter.service';
import { MaterialEntity } from '../../../repository/settings/material/entity/material.entity';

export class ProductsCrudService extends CrudService<ProductEntity, ProductDto> {

  constructor(
    @InjectRepository(ProductEntity) readonly productsRepository: Repository<ProductEntity>,
    @InjectRepository(MaterialEntity) readonly materialRepository: Repository<MaterialEntity>
  ) {
        super(productsRepository, new ProductConverter(materialRepository.find()));
  }

  public async updateProduct(product: ProductDto): Promise<ProductDto> {
    const productEntity = await this.converter.convertToEntity(product);
    await this.repository.save(productEntity);
    return await this.getById(product.id);
  }
}