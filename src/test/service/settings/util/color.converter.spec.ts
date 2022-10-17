import { ColorConverter } from '../../../../app/service/settings/util/color.converter';
import { ColorEntity } from '../../../../app/repository/settings/color/entity/color.entity';
import { ColorDTO } from '../../../../app/service/settings/model/ColorDTO';

describe('ColorConverter', () => {

  let colorConverter: ColorConverter;

    beforeEach( () => {
      colorConverter = new ColorConverter();
    });

    describe('convert',  () => {
        it('should convert to DTO', () => {
          const colorEntities: ColorEntity[] = [{ id: 1, firstColor: '#ffffff', secondColor: '#000000' }];
          const colorDTOs: ColorDTO[] = [{ id: 1, firstColor: '#ffffff', secondColor: '#000000' }];
          const convertResult = colorConverter.convertToDTO(colorEntities);
            expect(convertResult).toStrictEqual(colorDTOs);
        });
        it('should convert to Entity', () => {
          const colorEntities: ColorEntity[] = [{ id: 1, firstColor: '#ffffff', secondColor: '#000000' }];
          const colorDTOs: ColorDTO[] = [{ id: 1, firstColor: '#ffffff', secondColor: '#000000' }];
          const convertResult = colorConverter.convertToEntity(colorDTOs);
            expect(convertResult).toStrictEqual(colorEntities);
        });
    });
});

