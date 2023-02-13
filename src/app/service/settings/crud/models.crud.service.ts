import { CrudService } from '../../util/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelEntity } from '../../../repository/settings/model/entity/model.entity';
import { SimpleListSettingConverter } from '../../util/converter/simple.list.setting.converter';
import { SimpleListSetting } from '../../util/model/dto/simple.list.setting';

export class ModelsCrudService extends CrudService<ModelEntity, SimpleListSetting> {

  constructor(
    @InjectRepository(ModelEntity) readonly modelsRepository: Repository<ModelEntity>,
  ) {
        super(modelsRepository, new SimpleListSettingConverter(), 'Модели');
  }
}
