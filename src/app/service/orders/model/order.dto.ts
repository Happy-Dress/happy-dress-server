import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { ProductOrderDto } from '../../products/model/product-order.dto';

export class OrderDto implements IdentifiedModel {
    id?: number;
    name: string;
    phoneNumber: string;
    date?: Date;
    comment?: string;
    statusId?: number;
    products: ProductOrderDto[];
}