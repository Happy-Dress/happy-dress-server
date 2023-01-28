import {CrudService} from "../../util/crud/crud.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CategoryEntity} from "../../../repository/settings/category/entity/category.entity";
import {CategoryDTO} from "../model/CategoryDTO";
import {CategoryConverter} from "../util/converters/category.converter";

export class CategoriesCrudService extends CrudService<CategoryEntity, CategoryDTO> {

    constructor(
        @InjectRepository(CategoryEntity) readonly colorsRepository: Repository<CategoryEntity>,
    ) {
        super(colorsRepository, new CategoryConverter());
    }
}
