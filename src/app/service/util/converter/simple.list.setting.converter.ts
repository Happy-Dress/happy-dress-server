import { SimpleListSetting } from '../model/dto/SimpleListSetting';
import { SimpleListSettingEntity } from '../../../repository/settings/simpleListSetting.entity';
import { MultiConverter } from './multi.converter';

export class SimpleListSettingConverter extends MultiConverter<SimpleListSettingEntity, SimpleListSetting> {

  convertToDTOs(entities: SimpleListSettingEntity[]): SimpleListSetting[] {
    return entities.map(value => ({
      id: value.id,
      name: value.name,
    }));
  }

  convertToEntities(dtos: SimpleListSetting[]): SimpleListSettingEntity[] {
    return dtos.map(value => ({
      id: value.id,
      name: value.name,
    }));
  }
}
