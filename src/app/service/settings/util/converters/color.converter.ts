import { ColorEntity } from '../../../../repository/settings/color/entity/color.entity';
import { MultiConverter } from '../../../util/converter/multi.converter';
import { ColorDto } from '../../model/color.dto';

export class ColorConverter extends MultiConverter<ColorEntity, ColorDto> {

  public convertToDTOs(entities: ColorEntity[]): ColorDto[] {
    return entities.map(value => ({
      id: value.id,
      name: value.name,
      firstColor: value.firstColor,
      secondColor: value.secondColor,
    }));
  }

  public convertToEntities(DTOs: ColorDto[]): ColorEntity[] {
    return DTOs.map(value => ({
      id: value.id,
      name: value.name,
      firstColor: value.firstColor,
      secondColor: value.secondColor,
    }));
  }

}
