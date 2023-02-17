import { SimpleListSettingEntity } from '../../../repository/settings/simpleListSetting.entity';
import { MultiConverter } from './multi.converter';
import { SimpleListSetting } from '../model/dto/simple.list.setting';

export class SimpleListSettingConverter extends MultiConverter<SimpleListSettingEntity, SimpleListSetting> {

  public convertToDTO(entity: SimpleListSettingEntity): Promise<SimpleListSetting> {
    return  Promise.resolve({
      id: entity.id,
      name: entity.name,
    });
  }

  public convertToEntity(dto: SimpleListSetting): Promise<SimpleListSettingEntity> {
    return Promise.resolve({
      id: dto.id,
      name: dto.name,
    });
  }
}
