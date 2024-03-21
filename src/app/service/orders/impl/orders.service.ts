import { IOrdersService } from '../orders.service.abstraction';
import { OrderDto } from '../model/order.dto';
import { OrderViewDto } from '../model/order.view.dto';
import { OrderSearchDto } from '../model/order-search.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../../repository/order/entity/order.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { ProductEntity } from '../../../repository/product/entity/product.entity';
import { EntitiesNotFoundByIdsException } from '../../../exception/entities-not-found-by-ids.exception';
import {
  ProductColorImageEntity,
} from '../../../repository/product/product-color-image/entity/product-color-image.entity';
import { ProductColorSizeEntity } from '../../../repository/product/product-color-size/entity/product-color-size.entity';
import { Inject, Injectable } from '@nestjs/common';
import { OrderConverter } from '../util/converters/order.converter';
import { OrderSearchViewDto } from '../model/order-search.view.dto';
import { EntityDuplicateFieldException } from '../../../exception/entity-duplicate-field.exception';
import { ISettingsService } from '../../settings/settings.service.abstraction';
import { ProductConverter } from '../../products/util/converters/product.converter';
import { Transactional } from 'typeorm-transactional';
import { OrderStatusEntity } from '../../../repository/order/order-status/entity/order-status.entity';

const ORDERS = 'Заказы';

@Injectable()
export class OrdersService implements IOrdersService {
    @InjectRepository(OrderEntity)
    readonly ordersRepository: Repository<OrderEntity>;

    @InjectRepository(ProductEntity)
    readonly productsRepository: Repository<ProductEntity>;

    @InjectRepository(ProductColorImageEntity)
    readonly productColorImagesRepository: Repository<ProductColorImageEntity>;

    @InjectRepository(ProductColorSizeEntity)
    readonly productColorSizesRepository: Repository<ProductColorSizeEntity>;

    @InjectRepository(OrderStatusEntity)
    readonly orderStatusRepository: Repository<OrderStatusEntity>;


    @Inject()
    readonly settingsService: ISettingsService;

    @Inject()
    readonly orderConverter: OrderConverter;

    @Inject()
    readonly productConverter: ProductConverter;

    @Transactional()
    async createOrder(order: OrderDto): Promise<OrderViewDto> {
      const productColorSizeEntities = await this.productColorSizesRepository.findBy({
        id: In(order.products.map(productOrderedDto => productOrderedDto.productColorSizeId)),
      } as FindOptionsWhere<ProductColorSizeEntity>);

      order.date = new Date();

      const statusEntity = await this.orderStatusRepository.findOneBy({ id: order.statusId });

      const orderEntity = await this.orderConverter.convertToEntity(order, statusEntity, productColorSizeEntities);

      let savedEntity: OrderEntity;
      try {
        savedEntity = await this.ordersRepository.save(orderEntity);
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new EntityDuplicateFieldException(ORDERS);
        }
      }

      const productEntities = await this.productsRepository.findBy({
        id: In(savedEntity.productsOrdered.map(productOrder => productOrder.product.id)),
      });

      const productColorImageEntities = await this.productColorImagesRepository.findBy({
        product: {
          id: In(savedEntity.productsOrdered.map(productOrder => productOrder.product.id)),
        },
      });

      return this.orderConverter.convertToViewDto(savedEntity, productEntities, productColorImageEntities);
    }

    @Transactional()
    async getOrder(id: number): Promise<OrderViewDto> {
      const orderEntity = await this.findOrderById(id);

      const productsEntities = await this.productsRepository.findBy({
        product: {
          id: In(orderEntity.productsOrdered.map(product => product.id)),
        },
      } as FindOptionsWhere<ProductEntity>);

      const productColorImageEntities = await this.productColorImagesRepository.findBy({
        product: {
          id: In(orderEntity.productsOrdered.map(product => product.id)),
        },
      } as FindOptionsWhere<ProductColorImageEntity>);

      return this.orderConverter.convertToViewDto(orderEntity, productsEntities, productColorImageEntities);
    }

    @Transactional()
    async searchOrders(orderSearchDto: OrderSearchDto): Promise<OrderSearchViewDto> {
      return Promise.resolve(undefined);
    }

    @Transactional()
    async updateOrder(id: number, order: OrderDto): Promise<OrderViewDto> {
      const previousOrderEntity = await this.findOrderById(id);
      order.id = id;
      order.date = order?.date || previousOrderEntity.date;
      const productColorSizeEntities = await this.productColorSizesRepository.findBy({
        id: In(order.products.map(productOrderedDto => productOrderedDto.productColorSizeId)),
      } as FindOptionsWhere<ProductColorSizeEntity>);

      const statusEntity = await this.orderStatusRepository.findOneBy({ id: order.statusId });

      const orderEntity = await this.orderConverter.convertToEntity(order, statusEntity, productColorSizeEntities);
      const savedEntity = await this.ordersRepository.save(orderEntity);

      const productEntities = await this.productsRepository.findBy({
        id: In(savedEntity.productsOrdered.map(productOrder => productOrder.product.id)),
      });

      const productColorImageEntities = await this.productColorImagesRepository.findBy({
        product: {
          id: In(savedEntity.productsOrdered.map(productOrder => productOrder.product.id)),
        },
      });

      return this.orderConverter.convertToViewDto(savedEntity, productEntities, productColorImageEntities);

    }

    private async findOrderById(id: number): Promise<OrderEntity> {
      const productEntity = await this.ordersRepository.findOneBy( { id: id } as FindOptionsWhere<ProductEntity> );
      if (productEntity === null) {
        throw new EntitiesNotFoundByIdsException([id], ORDERS);
      }
      return productEntity;
    }

}