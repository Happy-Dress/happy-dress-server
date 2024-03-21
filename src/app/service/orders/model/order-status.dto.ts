import { IdentifiedModel } from '../../util/model/dto/identified.model';

export class OrderStatusDto implements IdentifiedModel {
    id?: number;
    name: string;
}