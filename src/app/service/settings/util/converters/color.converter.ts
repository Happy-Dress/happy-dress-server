import {ColorEntity} from '../../../../repository/settings/color/entity/color.entity';
import {ColorDTO} from '../../model/ColorDTO';
import {MultiConverter} from "../../../util/converter/multi.converter";

export class ColorConverter extends MultiConverter<ColorEntity, ColorDTO> {

    public convertToDTOs(enteties: ColorEntity[]): ColorDTO[] {
        return enteties.map(value => ({
            id: value.id,
            name: value.name,
            firstColor: value.firstColor,
            secondColor: value.secondColor,
        }));
    }

    public convertToEntities(dtos: ColorDTO[]): ColorEntity[] {
        return dtos.map(value => ({
            id: value.id,
            name: value.name,
            firstColor: value.firstColor,
            secondColor: value.secondColor,
        }));
    }

}
