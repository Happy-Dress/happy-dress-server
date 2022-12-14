import { Injectable } from '@nestjs/common';
import { SimpleListSetting } from '../model/SimpleListSetting';
import { SimpleListSettingEntity } from '../../../repository/settings/simpleListSetting.entity';

@Injectable()
export class SimpleListSettingConverter {
  public convertToDTO(simpleListSettingEntities: SimpleListSettingEntity[]): SimpleListSetting[] {
    return simpleListSettingEntities.map(value => ({
      id: value.id,
      name: value.name,
    }));
  }
  
  public convertToEntity(simpleListSettings: SimpleListSetting[]): SimpleListSettingEntity[] {
    return simpleListSettings.map(value => ({
      id: value.id,
      name: value.name,
    }));
  }
}