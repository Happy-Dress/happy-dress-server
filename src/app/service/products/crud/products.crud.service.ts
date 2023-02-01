import { CrudService } from '../../util/crud/crud.service';
import { ProductEntity } from '../../../repository/product/entity/product.entity';
import { ProductDto } from '../model/productDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductConverter } from '../util/converters/product.converter.service';

export class ProductsCrudService extends CrudService<ProductEntity, ProductDto> {

  constructor(
    @InjectRepository(ProductEntity) readonly productsRepository: Repository<ProductEntity>,
  ) {
        super(productsRepository, new ProductConverter());
  }

  public async updateProduct(product: ProductDto): Promise<void> {
    const productEntity = this.converter.convertToEntity(product);
    await this.repository.save(productEntity);
  }
}