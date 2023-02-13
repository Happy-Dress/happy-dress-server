import { CrudService } from '../../util/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorEntity } from '../../../repository/settings/color/entity/color.entity';
import { ColorConverter } from '../util/converters/color.converter';
import { ColorDto } from '../model/color.dto';

export class ColorsCrudService extends CrudService<ColorEntity, ColorDto> {

  constructor(
    @InjectRepository(ColorEntity) readonly colorsRepository: Repository<ColorEntity>,
  ) {
        super(colorsRepository, new ColorConverter(), 'Цвета');
  }
}
