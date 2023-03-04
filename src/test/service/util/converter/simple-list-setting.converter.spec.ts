import { SimpleListSettingConverter } from '../../../../app/service/util/converter/simple.list.setting.converter';
import { SimpleListSettingEntity } from '../../../../app/repository/settings/simpleListSetting.entity';
import { generateSimpleListEntity } from '../../../test-utils/mock-entity-generators';
import { generateSimpleListSetting } from '../../../test-utils/mock-dto-generators';
import { SimpleListSetting } from '../../../../app/service/util/model/dto/simple.list.setting';

describe('SimpleListSettingConverter', () => {

  let simpleListSettingConverter: SimpleListSettingConverter;

  beforeEach(() => {
    simpleListSettingConverter = new SimpleListSettingConverter();
  });

  describe('convert', () => {
    it('should convert to DTO', async () => {
      const settingsEntities: SimpleListSettingEntity[] = [generateSimpleListEntity()];
      const settingsDTOs: SimpleListSetting[] = [generateSimpleListSetting()];
      const convertResult = await simpleListSettingConverter.convertToDTOs(settingsEntities);
      expect(convertResult).toStrictEqual(settingsDTOs);
    });
    it('should convert to Entities', async () => {
      const settingsEntities: SimpleListSettingEntity[] = [generateSimpleListEntity()];
      const settingsDTOs: SimpleListSetting[] = [generateSimpleListSetting()];
      const convertResult = await simpleListSettingConverter.convertToEntities(settingsDTOs);
      expect(convertResult).toStrictEqual(settingsEntities);
    });
  });
});

