import { IdentifiedModel } from '../../util/model/dto/identified.model';

export class ProductColorSizeDto implements IdentifiedModel {
    id?: number;
    colorId: number;

    sizeId: number;

    isAvailable: boolean;
}