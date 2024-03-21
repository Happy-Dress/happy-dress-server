import { OrderViewDto } from './order.view.dto';

export class OrderSearchViewDto {
    orders: OrderViewDto[];
    totalItems: number;
}