import { CrudService } from '../../util/crud/crud.service';
import { GoodEntity } from '../../../repository/goods/entity/good.entity';
import { GoodDto } from '../model/good.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodConverter } from '../util/converters/good.converter.service';

export class GoodsCrudService extends CrudService<GoodEntity, GoodDto> {

  constructor(
    @InjectRepository(GoodEntity) readonly goodsRepository: Repository<GoodEntity>,
  ) {
        super(goodsRepository, new GoodConverter());
  }
}