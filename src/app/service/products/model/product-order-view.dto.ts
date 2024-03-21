import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { ProductColorImageViewDto } from './product-color-image.view.dto';
import { ProductColorSizeViewDto } from './product-color-size.view.dto';
import { CategoryDto } from '../../settings/model/category.dto';
import { ModelDto } from '../../settings/model/model.dto';
import { MaterialDto } from '../../settings/model/material.dto';

export class ProductOrderViewDto implements IdentifiedModel {
    id?: number;
    name: string;
    description: string;
    mainImageUrl: string;
    category: CategoryDto;
    model: ModelDto;
    materials: MaterialDto[];
    productColorImage: ProductColorImageViewDto;
    productColorSize: ProductColorSizeViewDto;
}