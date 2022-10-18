import { Injectable } from '@nestjs/common';
import { ColorEntity } from '../../../repository/settings/color/entity/color.entity';
import { ColorDTO } from '../model/ColorDTO';

@Injectable()
export class ColorConverter {
  public convertToDTO(colorEntities: ColorEntity[]): ColorDTO[] {
    return colorEntities.map(value => ({
      id: value.id,
      name: value.name,
      firstColor: value.firstColor,
      secondColor: value.secondColor,
    }));
  }
  
  public convertToEntity(colorDTOs: ColorDTO[]): ColorEntity[] {
    return colorDTOs.map(value => ({
      id: value.id,
      name: value.name,
      firstColor: value.firstColor,
      secondColor: value.secondColor,
    }));
  }

}