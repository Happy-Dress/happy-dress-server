import { CrudService } from '../../util/crud/crud.service';
import { SizeEntity } from '../../../repository/settings/size/enitity/size.entity';
import { SizeDto } from '../model/size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeConverter } from '../util/converters/size.converter';

export class SizesCrudService extends CrudService<SizeEntity, SizeDto> {
    
  constructor(@InjectRepository(SizeEntity) readonly sizesRepository: Repository<SizeEntity>) {
        super(sizesRepository, new SizeConverter());
  }
}