import { SimpleListSetting } from '../../util/model/dto/simple.list.setting';
import { ProductColorSizeDto } from './product-color-size.dto';


export class ProductDto extends SimpleListSetting {

    description: string;

    categoryId: number;

    modelId: number;

    materialIds: number[];

    productColorSizes: ProductColorSizeDto[];
}
