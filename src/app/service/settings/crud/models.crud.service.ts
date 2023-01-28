import {CrudService} from "../../util/crud/crud.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ModelEntity} from "../../../repository/settings/model/entity/model.entity";
import {SimpleListSetting} from "../model/SimpleListSetting";
import {SimpleListSettingConverter} from "../util/converters/simple.list.setting.converter";

export class ModelsCrudService extends CrudService<ModelEntity, SimpleListSetting> {

    constructor(
        @InjectRepository(ModelEntity) readonly modelsRepository: Repository<ModelEntity>,
    ) {
        super(modelsRepository, new SimpleListSettingConverter());
    }
}