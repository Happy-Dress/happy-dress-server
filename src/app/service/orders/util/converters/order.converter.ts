import { Inject, Injectable } from '@nestjs/common';
import { ProductConverter } from '../../../products/util/converters/product.converter';
import { OrderEntity } from '../../../../repository/order/entity/order.entity';
import { OrderViewDto } from '../../model/order.view.dto';
import { ProductEntity } from '../../../../repository/product/entity/product.entity';
import {
  ProductColorImageEntity,
} from '../../../../repository/product/product-color-image/entity/product-color-image.entity';
import { OrderDto } from '../../model/order.dto';
import {
  ProductColorSizeEntity,
} from '../../../../repository/product/product-color-size/entity/product-color-size.entity';
import { OrderStatusEntity } from '../../../../repository/order/order-status/entity/order-status.entity';


@Injectable()
export class OrderConverter {
    @Inject()
    private readonly productConverter: ProductConverter;
    
    async convertToViewDto(orderEntity: OrderEntity, productEntities: ProductEntity[], productColorImageEntities: ProductColorImageEntity[]): Promise<OrderViewDto> {

      const productOrderedViewDtos = await Promise.all(orderEntity.productsOrdered.map(async (productOrderEntity) => {
        return await this.productConverter.convertToProductOrderedViewDto(
                productEntities.find(productEntity => productEntity.id === productOrderEntity.product.id),
                productColorImageEntities.find(productColorImageEntity => productColorImageEntity.color.id === productOrderEntity.color.id),
                productOrderEntity
            );
      }));

      return {
        id: orderEntity.id,
        name: orderEntity.name,
        phoneNumber: orderEntity.phoneNumber,
        comment: orderEntity.comment,
        date: orderEntity.date,
        status: orderEntity.status,
        products: productOrderedViewDtos,
      };
    }

    convertToEntity(orderDto: OrderDto, orderStatusEntity: OrderStatusEntity, productColorSizeEntities: ProductColorSizeEntity[]): OrderEntity {
      return {
        id: orderDto.id,
        name: orderDto.name,
        phoneNumber: orderDto.phoneNumber,
        date: orderDto.date,
        comment: orderDto.comment,
        status: orderStatusEntity,
        productsOrdered: productColorSizeEntities,
      };
    }

}