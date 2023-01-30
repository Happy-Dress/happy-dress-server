import { IsString } from 'class-validator';
import { IdentifiedModel } from '../../util/model/dto/identified.model';

export class GoodDto implements IdentifiedModel {
    
    id?: number;
    
    @IsString()
    name: string;
}