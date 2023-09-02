import { CrudService } from '../../util/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../../repository/settings/category/entity/category.entity';
import { CategoryConverter } from '../util/converters/category.converter';
import { CategoryDto } from '../model/category.dto';
import { SettingType } from '../util/constant/setting.type.enum';

export class CategoriesCrudService extends CrudService<CategoryEntity, CategoryDto> {

  constructor(
    @InjectRepository(CategoryEntity) readonly colorsRepository: Repository<CategoryEntity>,
  ) {
        super(colorsRepository, new CategoryConverter(), SettingType.CATEGORIES);
  }
}
