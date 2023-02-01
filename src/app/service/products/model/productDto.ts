import { IsString } from 'class-validator';
import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { ModelDto } from '../../settings/model/model.dto';
import { CategoryDto } from '../../settings/model/category.dto';

export class ProductDto implements IdentifiedModel {
    
    id?: number;
    
    @IsString()
    name: string;
    
    category: CategoryDto;

    categoryId: number;
    
    model: ModelDto;

    modelId: number;
}