import { Injectable } from '@nestjs/common';
import { OrderStatusEntity } from '../../../../repository/order/order-status/entity/order-status.entity';
import { OrderStatusDto } from '../../model/order-status.dto';
import { MultiConverter } from '../../../util/converter/multi.converter';

@Injectable()
export class OrderStatusConverter implements MultiConverter<OrderStatusEntity, OrderStatusDto> {
  convertToDTOs(entities: OrderStatusEntity[]): Promise<OrderStatusDto[]> {
    return Promise.all(entities.map(entity => this.convertToDTO(entity)));
  }

  convertToEntities(dtos: OrderStatusDto[]): Promise<OrderStatusEntity[]> {
    return Promise.all(dtos.map(dto => this.convertToEntity(dto)));
  }

  convertToDTO(entity: OrderStatusEntity): Promise<OrderStatusDto> {
    return Promise.resolve({ id: entity.id, name: entity.name });
  }

  convertToEntity(dto: OrderStatusDto): Promise<OrderStatusEntity> {
    return Promise.resolve({ id: dto?.id, name: dto.name });
  }
}