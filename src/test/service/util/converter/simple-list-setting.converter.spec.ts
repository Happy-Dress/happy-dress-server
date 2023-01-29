import { SimpleListSettingConverter } from "../../../../app/service/util/converter/simple.list.setting.converter";
import { SimpleListSettingEntity } from "../../../../app/repository/settings/simpleListSetting.entity";
import { SimpleListSetting } from "../../../../app/service/util/model/dto/SimpleListSetting";
import { generateSimpleListEntity } from "../../../test-utils/mock-entity-generators";
import { generateSimpleListSetting } from "../../../test-utils/mock-dto-generators";

describe("SimpleListSettingConverter", () => {

  let simpleListSettingConverter: SimpleListSettingConverter;

  beforeEach(() => {
    simpleListSettingConverter = new SimpleListSettingConverter();
  });

  describe("convert", () => {
    it("should convert to DTO", () => {
      const settingsEntities: SimpleListSettingEntity[] = [generateSimpleListEntity()];
      const settingsDTOs: SimpleListSetting[] = [generateSimpleListSetting()];
      const convertResult = simpleListSettingConverter.convertToDTOs(settingsEntities);
      expect(convertResult).toStrictEqual(settingsDTOs);
    });
    it("should convert to Entities", () => {
      const settingsEntities: SimpleListSettingEntity[] = [generateSimpleListEntity()];
      const settingsDTOs: SimpleListSetting[] = [generateSimpleListSetting()];
      const convertResult = simpleListSettingConverter.convertToEntities(settingsDTOs);
      expect(convertResult).toStrictEqual(settingsEntities);
    });
  });
});

