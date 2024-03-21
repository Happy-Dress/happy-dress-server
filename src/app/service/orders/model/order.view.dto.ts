import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { OrderStatusDto } from './order-status.dto';
import { ProductOrderViewDto } from '../../products/model/product-order-view.dto';

export class OrderViewDto implements IdentifiedModel {
    id?: number;
    name: string;
    phoneNumber: string;
    comment: string;
    date: Date;
    status: OrderStatusDto;
    products: ProductOrderViewDto[];
}