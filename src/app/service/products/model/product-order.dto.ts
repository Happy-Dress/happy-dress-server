import { IdentifiedModel } from '../../util/model/dto/identified.model';

export class ProductOrderDto implements IdentifiedModel {
    id?: number;
    productId: number;
    productColorSizeId: number;
}