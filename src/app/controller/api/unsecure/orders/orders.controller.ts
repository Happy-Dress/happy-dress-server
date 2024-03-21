import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { IOrdersService } from '../../../../service/orders/orders.service.abstraction';
import { OrderViewDto } from '../../../../service/orders/model/order.view.dto';
import { OrderDto } from '../../../../service/orders/model/order.dto';
import { OrderSearchViewDto } from '../../../../service/orders/model/order-search.view.dto';
import { OrderSearchDto } from '../../../../service/orders/model/order-search.dto';

@Controller('orders')
export class OrdersController {

    @Inject()
    private orderService: IOrdersService;

    @Get(':id')
    async getOrder(@Param('id', new ParseIntPipe()) id: number): Promise<OrderViewDto> {
      return this.orderService.getOrder(id);
    }

    @Post()
    async createOrder(@Body() orderDto: OrderDto): Promise<OrderViewDto> {
      return this.orderService.createOrder(orderDto);
    }

    @Post('/search')
    async search(@Body() orderSearchDto: OrderSearchDto): Promise<OrderSearchViewDto> {
      return this.orderService.searchOrders(orderSearchDto);
    }
}