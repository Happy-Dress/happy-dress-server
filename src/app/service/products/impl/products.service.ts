import { Inject, Injectable } from '@nestjs/common';
import { IProductsService } from '../products.service.abstraction';
import { ProductDto } from '../model/productDto';
import { ProductsCrudService } from '../crud/products.crud.service';

@Injectable()
export class ProductsService implements IProductsService {
  
  @Inject()
  private productsCrudService: ProductsCrudService;
  
  public async getProduct(id: number): Promise<ProductDto> {
    return await this.productsCrudService.getById(id);
  }

  public async addProduct(product: ProductDto): Promise<void> {
    await this.productsCrudService.updateProduct(product);
  }

}