import { Controller, Get, Inject, ParseIntPipe, UseGuards, Param, Post, Body, Put } from '@nestjs/common';
import { IOrdersService } from '../../../../service/orders/orders.service.abstraction';
import { JwtAccessAuthGuard } from '../../../security/guards/jwt.access.auth.guard';
import { OrderViewDto } from '../../../../service/orders/model/order.view.dto';
import { OrderSearchDto } from '../../../../service/orders/model/order-search.dto';
import { OrderSearchViewDto } from '../../../../service/orders/model/order-search.view.dto';
import { OrderDto } from '../../../../service/orders/model/order.dto';

@Controller('/secure/orders')
export class OrdersSecureController {
    @Inject()
    private orderService: IOrdersService; 
    
    @UseGuards(JwtAccessAuthGuard)
    @Get(':id')
    async getOrder(@Param('id', new ParseIntPipe()) id: number): Promise<OrderViewDto> {
      return this.orderService.getOrder(id);
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post('/search')
    async search(@Body() orderSearchDto: OrderSearchDto): Promise<OrderSearchViewDto> {
      return this.orderService.searchOrders(orderSearchDto);
    }

    @UseGuards(JwtAccessAuthGuard)
    @Put(':id')
    async updateOrder(@Param('id', new ParseIntPipe()) id: number, @Body() orderDto: OrderDto): Promise<OrderViewDto> {
      return this.orderService.updateOrder(id, orderDto);
    }
}