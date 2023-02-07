import { IdentifiedModel } from '../../util/model/dto/identified.model';

export class SizeDto implements IdentifiedModel {
    id?: number;

    sizeValue: number;
}