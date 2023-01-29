import { CrudService } from '../../util/crud/crud.service';
import { MaterialEntity } from '../../../repository/settings/material/entity/material.entity';
import { SimpleListSetting } from '../../util/model/dto/SimpleListSetting';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SimpleListSettingConverter } from '../../util/converter/simple.list.setting.converter';

export class MaterialsCrudService extends CrudService<MaterialEntity, SimpleListSetting> {

  constructor(
    @InjectRepository(MaterialEntity) readonly materialsRepository: Repository<MaterialEntity>,
  ) {
        super( materialsRepository, new SimpleListSettingConverter());
  }
}
