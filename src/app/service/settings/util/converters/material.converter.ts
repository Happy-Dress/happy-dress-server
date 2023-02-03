import { MultiConverter } from '../../../util/converter/multi.converter';

import { MaterialEntity } from '../../../../repository/settings/material/entity/material.entity';
import { MaterialDto } from '../../model/material.dto';

export class MaterialConverter extends MultiConverter<MaterialEntity, MaterialDto> {

  convertToDTO(entity: MaterialEntity): Promise<MaterialDto> {
    return Promise.resolve( {
      id: entity.id,
      name: entity.name,
    });
  }

  convertToEntity(dto: MaterialDto): Promise<MaterialEntity> {
    return Promise.resolve({
      id: dto.id,
      name: dto.name,
      products: null,
    });
  }

}