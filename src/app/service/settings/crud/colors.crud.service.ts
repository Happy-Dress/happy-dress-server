import {CrudService} from "../../util/crud/crud.service";
import {MaterialEntity} from "../../../repository/settings/material/entity/material.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ColorEntity} from "../../../repository/settings/color/entity/color.entity";
import {ColorDTO} from "../model/ColorDTO";
import {ColorConverter} from "../util/converters/color.converter";

export class ColorsCrudService extends CrudService<ColorEntity, ColorDTO> {

    constructor(
        @InjectRepository(MaterialEntity) readonly colorsRepository: Repository<ColorEntity>,
    ) {
        super(colorsRepository, new ColorConverter());
    }
}
