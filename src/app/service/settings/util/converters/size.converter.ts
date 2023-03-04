import { MultiConverter } from '../../../util/converter/multi.converter';
import { SizeEntity } from '../../../../repository/settings/size/enitity/size.entity';
import { SizeDto } from '../../model/size.dto';

export class SizeConverter extends MultiConverter<SizeEntity, SizeDto> {
  convertToEntity(dto: SizeDto): Promise<SizeEntity> {
    return Promise.resolve({
      id: dto.id,
      sizeValue: dto.sizeValue,
    });
  }
  
  convertToDTO(entity: SizeEntity): Promise<SizeDto> {
    return Promise.resolve({
      id: entity.id,
      sizeValue: entity.sizeValue,
    });
  }
}