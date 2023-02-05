import { IsString } from 'class-validator';
import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { CategoryDto } from '../../settings/model/category.dto';
import { ModelDto } from '../../settings/model/model.dto';
import { MaterialDto } from '../../settings/model/material.dto';


export class ProductDto implements IdentifiedModel {
    id?: number;
    
    @IsString()
    name: string;


    category: CategoryDto;

    model: ModelDto;
    
    materials: MaterialDto[];
}