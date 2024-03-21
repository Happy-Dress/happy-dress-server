import { OrderViewDto } from './model/order.view.dto';
import { OrderDto } from './model/order.dto';
import { OrderSearchDto } from './model/order-search.dto';
import { OrderSearchViewDto } from './model/order-search.view.dto';

export abstract class IOrdersService {
  abstract  getOrder(id: number): Promise<OrderViewDto>;

  abstract createOrder(order: OrderDto): Promise<OrderViewDto>;

  abstract updateOrder(id: number, order: OrderDto): Promise<OrderViewDto>;

  abstract searchOrders(
    orderSearchDto: OrderSearchDto
  ): Promise<OrderSearchViewDto>;
}