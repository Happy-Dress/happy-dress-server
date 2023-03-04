import { ColorEntity } from '../../../../repository/settings/color/entity/color.entity';
import { MultiConverter } from '../../../util/converter/multi.converter';
import { ColorDto } from '../../model/color.dto';

export class ColorConverter extends MultiConverter<ColorEntity, ColorDto> {

<<<<<<< HEAD
  public convertToDTOs(entities: ColorEntity[]): ColorDto[] {
    return entities.map(value => ({
      id: value.id,
      name: value.name,
      orderNumber: value.orderNumber,
      firstColor: value.firstColor,
      secondColor: value.secondColor,
    }));
  }

  public convertToEntities(DTOs: ColorDto[]): ColorEntity[] {
    return DTOs.map(value => ({
      id: value.id,
      name: value.name,
      orderNumber: value.orderNumber,
      firstColor: value.firstColor,
      secondColor: value.secondColor,
    }));
=======
  convertToDTO(entity: ColorEntity): Promise<ColorDto> {
    return Promise.resolve( {
      id: entity.id,
      name: entity.name,
      firstColor: entity.firstColor,
      secondColor: entity.secondColor,
    });
  }

  convertToEntity(dto: ColorDto): Promise<ColorEntity> {
    return Promise.resolve({
      id: dto.id,
      name: dto.name,
      firstColor: dto.firstColor,
      secondColor: dto.secondColor,
    });
>>>>>>> develop
  }

}
