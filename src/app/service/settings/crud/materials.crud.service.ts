import { CrudService } from '../../util/crud/crud.service';
import { MaterialEntity } from '../../../repository/settings/material/entity/material.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SimpleListSetting } from '../../util/model/dto/simple.list.setting';
import { MaterialConverter } from '../util/converters/material.converter';

export class MaterialsCrudService extends CrudService<MaterialEntity, SimpleListSetting> {

  constructor(
    @InjectRepository(MaterialEntity) readonly materialsRepository: Repository<MaterialEntity>,
  ) {
        super( materialsRepository, new MaterialConverter());
  }
}
