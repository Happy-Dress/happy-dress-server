import {SimpleListSettingConverter} from "../../../../app/service/settings/util/simpleListSetting.converter";
import {SimpleListSettingEntity} from "../../../../app/repository/settings/simpleListSetting.entity";
import {SimpleListSetting} from "../../../../app/service/settings/model/SimpleListSetting";

describe('SimpleListSettingConverter', () => {

    let simpleListSettingConverter: SimpleListSettingConverter;

    beforeEach( () => {
        simpleListSettingConverter = new SimpleListSettingConverter();
    });

    describe('convert',  () => {
        it('should convert to DTO', () => {
            const settingsEntities: SimpleListSettingEntity[] = [{id: 1, description: 'plain text'}];
            const settingsDTOs: SimpleListSetting[] = [{id: 1, description: 'plain text'}];
            const convertResult = simpleListSettingConverter.convertToDTO(settingsEntities);
            expect(convertResult).toStrictEqual(settingsDTOs);
        });
        it('should convert to Entity', () => {
            const settingsEntities: SimpleListSettingEntity[] = [{id: 1, description: 'plain text'}];
            const settingsDTOs: SimpleListSetting[] = [{id: 1, description: 'plain text'}];
            const convertResult = simpleListSettingConverter.convertToEntity(settingsDTOs);
            expect(convertResult).toStrictEqual(settingsEntities);
        });
    });
});

