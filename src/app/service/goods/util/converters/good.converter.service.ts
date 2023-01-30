import { Injectable } from '@nestjs/common';
import { MultiConverter } from '../../../util/converter/multi.converter';
import { GoodEntity } from '../../../../repository/goods/entity/good.entity';
import { GoodDto } from '../../model/good.dto';

@Injectable()
export class GoodConverter extends MultiConverter<GoodEntity, GoodDto> {

  public convertToDTOs(entities: GoodEntity[]): GoodDto[] {
    return entities.map(value => ({
      id: value.id,
      name: value.name,
    }));
  }

  public convertToEntities(dtos: GoodDto[]): GoodEntity[] {
    return dtos.map(value => ({
      id: value.id,
      name: value.name,
    }));
  }

}