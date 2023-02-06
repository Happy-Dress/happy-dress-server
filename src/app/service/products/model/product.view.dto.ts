import {CategoryDto} from "../../settings/model/category.dto";
import { ModelDto } from "../../settings/model/model.dto";
import { MaterialDto} from "../../settings/model/material.dto";
import { SimpleListSetting} from "../../util/model/dto/simple.list.setting";

export class ProductViewDto extends SimpleListSetting {

    description: string;

    category: CategoryDto;

    model: ModelDto;

    materials: MaterialDto[];
}
