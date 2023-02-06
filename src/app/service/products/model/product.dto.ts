import { SimpleListSetting } from "../../util/model/dto/simple.list.setting";


export class ProductDto extends SimpleListSetting {

    description: string;

    categoryId: number;

    modelId: number;

    materialIds: number[];
}
