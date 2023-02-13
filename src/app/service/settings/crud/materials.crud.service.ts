import { CrudService } from '../../util/crud/crud.service';
import { MaterialEntity } from '../../../repository/settings/material/entity/material.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SimpleListSettingConverter } from '../../util/converter/simple.list.setting.converter';
import { SimpleListSetting } from '../../util/model/dto/simple.list.setting';

const MATERIALS = 'Материалы';

export class MaterialsCrudService extends CrudService<MaterialEntity, SimpleListSetting> {

  constructor(
    @InjectRepository(MaterialEntity) readonly materialsRepository: Repository<MaterialEntity>,
  ) {
        super( materialsRepository, new SimpleListSettingConverter(), MATERIALS);
  }
}
